import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe, TitleCasePipe],
  templateUrl: './user-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserList {
  private userService = inject(UserService);
  private router = inject(Router);

  // Sort users by ID 
  public users$: Observable<User[]> = this.userService.getUsers().pipe(
    map(users => users.sort((a, b) => {
      const idA = typeof a.id === 'string' ? parseInt(a.id, 10) : a.id;
      const idB = typeof b.id === 'string' ? parseInt(b.id, 10) : b.id;
      return idA - idB;
    }))
  );
  public isDeleting = signal<number | null>(null);

  onAddUser(): void {
    this.router.navigate(['/users/create-user']);
  }

  onEditUser(id: number): void {
    this.router.navigate(['/users', id]);
  }

  onDeleteUser(id: number): void {
    if (confirm('¿Está seguro que desea eliminar este usuario?')) {
      this.isDeleting.set(id);

      this.userService.deleteUser(id).subscribe({
        next: () => {
          // Reload users list
          this.users$ = this.userService.getUsers().pipe(
            map(users => users.sort((a, b) => {
              const idA = typeof a.id === 'string' ? parseInt(a.id, 10) : a.id;
              const idB = typeof b.id === 'string' ? parseInt(b.id, 10) : b.id;
              return idA - idB;
            }))
          );
          this.isDeleting.set(null);
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.isDeleting.set(null);
          alert('Error al eliminar el usuario');
        }
      });
    }
  }

}