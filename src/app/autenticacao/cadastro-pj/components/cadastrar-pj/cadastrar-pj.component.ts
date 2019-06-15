import { CpfValidator, CnpjValidator } from '../../../../shared/validators';
import { CadastroPj } from '../../models';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SomenteNumeros } from 'src/app/shared/utils';

@Component({
  selector: 'app-cadastrar-pj',
  templateUrl: './cadastrar-pj.component.html',
  styleUrls: ['./cadastrar-pj.component.css']
})
export class CadastrarPjComponent implements OnInit {

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, CpfValidator]],
      razaoSocial: ['', [Validators.required, Validators.minLength(5)]],
      cnpj: ['', [Validators.required, CnpjValidator]]
    });
  }

  cadastrarPj() {
    if (this.form.invalid) {
      return;
    }

    const cadastroPj: CadastroPj = this.form.value;
    cadastroPj.cnpj = new SomenteNumeros(cadastroPj.cnpj).formato();
    cadastroPj.cpf = new SomenteNumeros(cadastroPj.cpf).formato();
    alert(JSON.stringify(cadastroPj));
  }

}
