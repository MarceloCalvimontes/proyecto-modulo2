import { ChangeDetectionStrategy, Component, inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GuitarService } from '../../../services/guitar.service';
import { PickupConfiguration } from '../../../interfaces/guitar.interface';
@Component({
  selector: 'app-guitar-by-id',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './guitar-by-id.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export default class GuitarById implements OnInit {
  private fb = inject(FormBuilder);
  private guitarService = inject(GuitarService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public guitarForm: FormGroup;
  public pickups = Object.values(PickupConfiguration);
  public isSubmitting = false;
  public isLoading = true;
  public guitarId: number = 0;

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
  ngOnInit(): void {
    this.guitarId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.guitarId) {
      this.loadGuitar();
    }
  }

  loadGuitar(): void {
    this.guitarService.getGuitarById(this.guitarId).subscribe({
      next: (guitar) => {
        if (guitar) {
          this.guitarForm.patchValue(guitar);
          this.isLoading = false;
        } else {
          this.router.navigate(['/guitars']);
        }
      },
      error: (error) => {
        console.error('Error loading guitar:', error);
        this.router.navigate(['/guitars']);
      }
    });
  }

  onSubmit(): void {
    if (this.guitarForm.valid) {
      this.isSubmitting = true;

      this.guitarService.updateGuitar(this.guitarId, this.guitarForm.value).subscribe({
        next: () => {
          this.router.navigate(['/guitars']);
        },
        error: (error) => {
          console.error('Error updating guitar:', error);
          this.isSubmitting = false;
        }
      });
    } else {
      Object.keys(this.guitarForm.controls).forEach(key => {
        this.guitarForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/guitars']);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.guitarForm.get(fieldName);

    if (control?.hasError('required')) {
      return `${fieldName} es requerido`;
    }

    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
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