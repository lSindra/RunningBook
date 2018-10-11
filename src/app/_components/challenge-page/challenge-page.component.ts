import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { AuthProcessService, FirestoreSyncService } from 'ngx-auth-firebaseui';
import { ChallengeModel } from 'src/app/_models/challenge-model';
import { ChallengeService } from 'src/app/_services/challenge.service';

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
              private challengeService: ChallengeService) {}

  ngOnInit() {
    this.populateChallenges();
  }

  populateChallenges() {
    // Importa desafios do banco
    // this.challengeService.getChallenges().subscribe(
    //   (challenges) => this.challenges = (challenges)
    //   );
  }

}
