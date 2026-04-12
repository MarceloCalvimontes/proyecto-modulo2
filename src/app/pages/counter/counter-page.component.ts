import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
  selector: 'counter-component',
  templateUrl: './counter-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CounterPageComponent {
  public counter: number = 0;
  public counterSignal = signal(0);

  constructor(){
    // setInterval(() => {
    //   this.counter++;
    //   console.log("Boom");
    //   this.counterSignal.update((v) => v + 5)
    // }, 2000);
  }

  increaseCounter(value: number): void{
    this.counter += value;
    // this.counterSignal.set(this.counterSignal() + 1);
    this.counterSignal.update((v) => v + value)
  }

  resetCounter(): void{
    this.counter = 0;
    this.counterSignal.set(0);
  }
}
