import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CharacterList } from "../../components/dragonball-super/character-list/character-list";
import { CharacterAdd } from "../../components/dragonball-super/character-add/character-add";
import { DragonballService } from '../../services/dragonball.service';

@Component({
  selector: 'app-dragonball-super',
  imports: [CharacterList, CharacterAdd],
  templateUrl: './dragonball-super.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DragonballSuper {
  public dragonballService = inject(DragonballService);
} 
