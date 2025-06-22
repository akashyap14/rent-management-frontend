import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, NgIf],
  template: `
    <div *ngIf="loaderService.loading$ | async" class="spinner-overlay">
      <mat-progress-spinner color="primary" mode="indeterminate" diameter="50"></mat-progress-spinner>
    </div>
  `,
  styles: [`
    .spinner-overlay {
      position: fixed;
      top: 0; left: 0;
      right: 0; bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.4);
      z-index: 9999;
    }
  `]
})
export class SpinnerComponent {
  constructor(public loaderService: LoaderService) {}
}
