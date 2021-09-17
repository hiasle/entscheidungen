import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeTemplatedrivenComponent } from './welcome-templatedriven/welcome-templatedriven.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WelcomeTemplatedrivenComponent],
  imports: [CommonModule, FormsModule],
  exports: [WelcomeTemplatedrivenComponent],
})
export class TemplatedrivenModule {}
