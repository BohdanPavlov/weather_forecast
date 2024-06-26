import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatIconModule,
		MatToolbarModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatAutocompleteModule,
		MatCardModule,
		MatProgressSpinnerModule,
		MatSlideToggleModule,
	],
	exports: [
		MatIconModule,
		MatToolbarModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatAutocompleteModule,
		MatCardModule,
		MatProgressSpinnerModule,
		MatSlideToggleModule,
	],
})
export class MaterialModule {}
