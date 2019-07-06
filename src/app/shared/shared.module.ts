import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {IMaskModule} from 'angular-imask';
import { TipoPipe } from './pipes';
import { PtBrMatPaginatorIntl } from './pt-br-mat-paginator-intl';

@NgModule({
  imports: [
    CommonModule,
    IMaskModule
  ],
  declarations: [
  TipoPipe],
  exports: [
    IMaskModule,
    TipoPipe
  ],
  providers: [
    PtBrMatPaginatorIntl
  ]
})
export class SharedModule { }
