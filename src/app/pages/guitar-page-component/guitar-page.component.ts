import { ChangeDetectionStrategy, Component } from '@angular/core';
import  GuitarList, {} from '../../components/guitar/guitar-list/guitar-list';

@Component({
  selector: 'app-guitar',
  imports: [GuitarList],
  templateUrl: './guitar-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Guitar { }
