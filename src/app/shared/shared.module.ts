import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {IMaskModule} from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    IMaskModule
  ],
  declarations: [
  ],
  exports: [
    IMaskModule
  ]
})
export class SharedModule { }
