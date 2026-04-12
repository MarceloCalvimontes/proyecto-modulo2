import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GuitarService } from '../../../services/guitar.service';
import { PickupConfiguration } from '../../../interfaces/guitar.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guitar-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './guitar-create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GuitarCreate { 
  private fb = inject(FormBuilder);
  private guitarService = inject(GuitarService);
  private router = inject(Router);

  public guitarForm: FormGroup;
  public pickups = Object.values(PickupConfiguration);
  public isSubmitting = false;

  constructor() {
    this.guitarForm = this.fb.group({
      id: [0],
      brand: ['', [Validators.required, Validators.minLength(3)]],
      model: ['', [Validators.required, Validators.minLength(3)]],
      year: ['', [Validators.required, Validators.min(1)]],
      pickup_configuration: [PickupConfiguration.HH, [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
    })
  }

  onSubmit(): void {
    if (this.guitarForm.valid) {
      this.isSubmitting = true;

      this.guitarService
        .createGuitar(this.guitarForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/guitars']);
          },
          error: (err) => {
            console.log('Error al crear guitarra', err);
            this.isSubmitting = false;
          }
        })
    }
  }
  
  onCancel(): void {
    this.router.navigate(['/guitars']);
  }
  getErrorMessage(fieldName: string): string {
    const control = this.guitarForm.get(fieldName);

    if(control?.hasError('required')){
      return `${fieldName} es requerido`
    }
    if(control?.hasError('minLength')){
      const minLength = control.errors?.['minLength'].requiredLength;
      return `${fieldName} debe tener al menos ${minLength} caracteres`;
    }
    if(control?.hasError('min')){
      const min = control.errors?.['min'].requiredLength;
      return `${fieldName} debe ser mayor o igual a 1`;
    }
    return '';
  }
   isFieldInvalid(fieldName: string): boolean {
    const control = this.guitarForm.get(fieldName);
    return !!(control?.invalid && control?.touched);
  }

}
