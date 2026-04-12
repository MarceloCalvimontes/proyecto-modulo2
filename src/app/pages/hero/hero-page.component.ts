import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeroPageComponent {
  name = signal('Ironman');
  age = signal(45);

  getHeroDescription = computed(() => {
    const description = `${this.name()} - ${this.age()}`;
    return description
  });

  changeHero(): void{
    this.name.set('Superman');
    this.age.set(500);
  }

  changeAge(): void{
    this.age.set(100);
  }

  resetForm(): void{
    this.name.set('Ironman');
    this.age.set(45);
  }
}
