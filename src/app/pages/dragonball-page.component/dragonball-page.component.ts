import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dragonball-page.component',
  imports: [],
  templateUrl: './dragonball-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DragonballPageComponent {
  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9000 },
    { id: 2, name: 'Vegeta', power: 8000 },
    { id: 3, name: 'Yamcha', power: 500 },
    { id: 4, name: 'Piccolo', power: 5000 },
  ])

  addCharacter(): void {
    if (!this.name() || !this.power() || (this.power() <= 0)) {
      return;
    }

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power()
    }

    this.characters.update((values) => [...values, newCharacter]);
    this.resetFields();
  }

  resetFields(): void {
    this.name.set('');
    this.power.set(0);
  }
}
