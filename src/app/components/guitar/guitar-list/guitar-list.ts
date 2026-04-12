import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { GuitarService } from '../../../services/guitar.service';
import { Guitar } from '../../../interfaces/guitar.interface';

@Component({
  selector: 'app-guitar-list',
  imports: [AsyncPipe, TitleCasePipe],
  templateUrl: './guitar-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GuitarList { 
  private guitarService = inject(GuitarService);
  private router = inject(Router);
  public isDeleting = signal<number | null>(null);

  public guitars$: Observable<Guitar[]> = this.guitarService.getGuitars().pipe(
    map(guitars => guitars.sort((a, b) => {
      const idA = typeof a.id === 'string' ? parseInt(a.id, 10) : a.id;
      const idB = typeof b.id === 'string' ? parseInt(b.id, 10) : b.id;
      return idA - idB;
    }))
  );

  onAddGuitar(): void {
    this.router.navigate(['guitars/create-guitar']);
  }

  onEditGuitar(id: number): void {
    this.router.navigate(['/guitars', id]);
  }
  
  onDeleteGuitar(id: number): void {
    if(confirm('Esta Seguro de eliminar esta guitarra?')) {
      this.isDeleting.set(id);

      this.guitarService.deleteGuitar(id).subscribe({
        next: () => {
          //reload guitars list
          this.guitars$ = this.guitarService.getGuitars().pipe(
            map(guitars => guitars.sort((a, b) => {
            const idA = typeof a.id === 'string' ? parseInt(a.id, 10) : a.id;
            const idB = typeof b.id === 'string' ? parseInt(b.id, 10) : b.id;
            return idA - idB;
            }))
          );
          this.isDeleting.set(null);
        },
        error: (error) => {
          console.error('Error deleting guitar:', error);
          this.isDeleting.set(null);
          alert('Error al eliminar la guitarra');
        }
      });
    }
      
  }

}
