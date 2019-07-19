import { FormBuilder } from '@angular/forms';
import { HttpUtilService } from './../../../shared/services/http-util.service';
import { LancamentoService } from './../../../shared/services/lancamento.service';
import { MatTableDataSource, MatSnackBar, PageEvent, MatSort } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Lancamento } from 'src/app/shared/models';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  DATA = 'data';
  TIPO = 'tipo';

  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = [this.DATA, this.TIPO, 'localizacao', 'acao'];
  funcionarioId: string;
  totalLancamentos: number;

  private pagina: number;
  private ordem: string;
  private direcao: string;

  constructor(
    private lancamentoService: LancamentoService,
    private httpUtilService: HttpUtilService,
    private matSnackBar: MatSnackBar,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pagina = 0;
    this.ordemPadrao();
    this.exibirLancamentos();
  }

  ordemPadrao() {
    this.ordem = this.DATA;
    this.direcao = 'DESC';
  }

  exibirLancamentos() {
    this.funcionarioId = '2';
    this.lancamentoService.listarLancamentosPorFuncionario(
      this.funcionarioId, this.pagina, this.ordem, this.direcao)
      .subscribe(
        data => {
          this.totalLancamentos = data[this.DATA].totalElements;
          const lancamentos = data[this.DATA].content as Lancamento[];
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
