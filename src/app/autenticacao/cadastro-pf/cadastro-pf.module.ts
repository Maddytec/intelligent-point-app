import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './../../';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CadastrarPfComponent, CadastroPfComponent } from './components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatListModule, MatInputModule, MatTooltipModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { CadastrarPfService } from './services';


@NgModule({
  declarations: [
    CadastrarPfComponent,
    CadastroPfComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    SharedModule
  ],
  providers: [
    CadastrarPfService
  ]
})
export class CadastroPfModule { }
