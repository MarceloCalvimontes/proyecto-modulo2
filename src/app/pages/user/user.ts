import { ChangeDetectionStrategy, Component } from '@angular/core';
import UserList, {} from "../../components/user/user-list/user-list";

@Component({
  selector: 'app-user',
  imports: [UserList],
  templateUrl: './user.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class User { }
