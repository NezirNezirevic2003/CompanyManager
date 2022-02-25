import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ModalComponent],
})
export class ModalModule {}
