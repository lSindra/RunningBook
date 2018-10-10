import { Component, HostListener, ElementRef } from '@angular/core';
import { RunningUserModel } from 'src/app/_models/user-model';
import { UserService } from 'src/app/_services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent {
  constructor(public auth: AngularFireAuth,
              private userService: UserService) {
                this.init()
              }
  
  user: RunningUserModel;

  init() {
    this.userService.getUserByUID(this.auth.auth.currentUser.uid).subscribe(
      (user)  => { this.user = user },
      (error) => { console.log(error) }
    )
  }
}
