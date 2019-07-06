import { Lancamento } from './../models/lancamento.model';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpUtilService } from './http-util.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LancamentoService {

  private readonly PATH = 'lancamentos';
  private readonly PATH_ULTIMO_LANC = '/funcionario/{funcionarioId}/ultimo';
  private readonly PATH_LANCAMENTOS = '/funcionario/{funcionarioId}';
  private readonly PATH_TODOS_LANC = '/funcionario/{funcionarioId}/todos';


  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService) { }

  buscarUltimoTipoLancado(): Observable<any> {
    return this.http.get(
      environment.baseApiUrl + this.PATH +
      this.PATH_ULTIMO_LANC.replace(
        '{funcionarioId}', this.httpUtil.obterIdUsuario()),
      this.httpUtil.headers()
    );
  }

  cadastrar(lancamento: Lancamento): Observable<any> {
    return this.http.post(
      environment.baseApiUrl + this.PATH,
      lancamento,
      this.httpUtil.headers()
    );
  }

  listarTodosLancamentos(): Observable<any> {
    return this.http.get(
      environment.baseApiUrl + this.PATH +
      this.PATH_TODOS_LANC.replace(
        '{funcionarioId}', this.httpUtil.obterIdUsuario()),
      this.httpUtil.headers()
    );
  }
}

