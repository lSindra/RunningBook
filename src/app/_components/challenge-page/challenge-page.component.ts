import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { AuthProcessService, FirestoreSyncService } from 'ngx-auth-firebaseui';
import { ChallengeModel } from 'src/app/_models/challenge-model';
import { ChallengeService } from 'src/app/_services/challenge.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-challenge-page',
  templateUrl: './challenge-page.component.html',
  styleUrls: ['./challenge-page.component.scss']
})
export class ChallengePageComponent implements OnInit {
  challenges: ChallengeModel[];

  constructor(public auth: AngularFireAuth,
              public authProcess: AuthProcessService,
              private _fireStoreService: FirestoreSyncService,
              private snackBar: MatSnackBar,
              private challengeService: ChallengeService,
              private router: Router) {}

  ngOnInit() {
    this.populateChallenges();
  }

  populateChallenges() {
    // Importa desafios do banco
    // this.challengeService.getChallenges().subscribe(
    //   (challenges) => this.challenges = (challenges)
    //   );
  }
  goToRun(){
    this.router.navigate(['run']);
  }
  goToBodyB(){
    this.router.navigate(['bodybuilding']);
  }
  goToFood(){
    this.router.navigate(['food']);
  }
  goToPilates(){
    this.router.navigate(['pilates']);
  }

}
