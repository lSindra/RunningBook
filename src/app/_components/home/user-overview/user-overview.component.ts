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
  levels =
  {
    "1": {
        "experience": 250,
        "level": 1
    },
    "2": {
        "experience": 500,
        "level": 2
    },
    "3": {
        "experience": 750,
        "level": 3
    },
    "4": {
        "experience": 1000,
        "level": 4
    },
    "5": {
        "experience": 1500,
        "level": 5
    }
  }
  init() {
    this.userService.getUserByUID(this.auth.auth.currentUser.uid).subscribe(
      (user)  => { this.user = user },
      (error) => { console.log(error) }
    )
  }
}
