import { FuncionarioService } from './../../../shared/services/funcionario.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpUtilService } from './../../../shared/services/http-util.service';
import { LancamentoService } from './../../../shared/services/lancamento.service';
import { MatTableDataSource, MatSnackBar, PageEvent, MatSort, MatSelect } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Lancamento, Funcionario } from 'src/app/shared/models';

const DATA = 'data';
const TIPO = 'tipo';
const VALUE = 'value';
const FUNCIONARIO_ID = 'funcionarioId';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = [DATA, TIPO, 'localizacao', 'acao'];
  funcionarioId: string;
  totalLancamentos: number;

  funcionarios: Funcionario[];
  @ViewChild(MatSelect)
  matSelect: MatSelect;
  form: FormGroup;

  private pagina: number;
  private ordem: string;
  private direcao: string;

  constructor(
    private lancamentoService: LancamentoService,
    private httpUtilService: HttpUtilService,
    private matSnackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService
  ) { }

  ngOnInit() {
    this.pagina = 0;
    this.ordemPadrao();
    this.obterFuncionarios();
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.formBuilder.group({
      funcs: ['', []]
    });
  }

  ordemPadrao() {
    this.ordem = DATA;
    this.direcao = 'DESC';
  }

  get funcId(): string {
    return sessionStorage[FUNCIONARIO_ID] || false;
  }

  obterFuncionarios() {
    this.funcionarioService.listaFuncionarioPorEmpresa()
      .subscribe(
        data => {
          const usuarioId: string = this.httpUtilService.obterIdUsuario();
          this.funcionarios = (data.data as Funcionario[])
            .filter(func => func.id !== usuarioId);

          if (this.funcId) {
            this.form.get('funcs').setValue(parseInt(this.funcId, 10));
            this.exibirLancamentos();
          }
        },
        err => {
          const msg = 'Erro obtendo funcionários.';
          this.matSnackBar.open(msg, 'Erro', { duration: 6000 });
        }
      );
  }

  exibirLancamentos() {
    if (this.matSelect.selected) {
      this.funcionarioId = this.matSelect.selected[VALUE];
    } else if (this.funcId) {
      this.funcionarioId = this.funcId;
    } else {
      return;
    }

    sessionStorage[FUNCIONARIO_ID] = this.funcionarioId;

    this.lancamentoService.listarLancamentosPorFuncionario(
      this.funcionarioId, this.pagina, this.ordem, this.direcao)
      .subscribe(
        data => {
          this.totalLancamentos = data[DATA].totalElements;
          const lancamentos = data[DATA].content as Lancamento[];
          this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
        },
        err => {
          const msg = 'Erro obtendo lançamentos.';
          this.matSnackBar.open(msg, 'Erro', { duration: 6000 });
        }
      );
  }

  remover(lancamentoId: string) {
    alert(lancamentoId);
  }

  paginar(pageEvent: PageEvent) {
    this.pagina = pageEvent.pageIndex;
    this.exibirLancamentos();
  }

  ordenar(sort: MatSort) {
    if (sort.direction === '') {
      this.ordemPadrao();
    } else {
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();
    }
    this.exibirLancamentos();
  }

}
