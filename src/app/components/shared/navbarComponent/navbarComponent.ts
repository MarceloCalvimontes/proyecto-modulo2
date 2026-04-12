import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbarComponent.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent { }
