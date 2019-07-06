import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {IMaskModule} from 'angular-imask';
import { PtBrMatPaginatorIntl } from './pt-br-mat-paginator-intl';

@NgModule({
  imports: [
    CommonModule,
    IMaskModule
  ],
  declarations: [
  ],
  exports: [
    IMaskModule
  ],
  providers: [
    PtBrMatPaginatorIntl
  ]
})
export class SharedModule { }
