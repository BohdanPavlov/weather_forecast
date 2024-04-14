import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MaterialModule } from 'src/app/shared/material.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
	declarations: [
    HeaderComponent
  ],
	imports: [
		CommonModule,
		RouterLink,
		MaterialModule,
		RouterLinkActive,
	],
	exports: [HeaderComponent],
})
export class CoreModule {}
