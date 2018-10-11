import { Component, OnInit } from '@angular/core';
import { ChallengeService } from 'src/app/_services/challenge.service';
import { ChallengeModel } from 'src/app/_models/challenge-model';

@Component({
  selector: 'app-challenges-overview',
  templateUrl: './challenges-overview.component.html',
  styleUrls: ['./challenges-overview.component.scss']
})
export class ChallengesOverviewComponent implements OnInit {
  constructor(private challengeService: ChallengeService) { }

  challenges: ChallengeModel[];
  
  ngOnInit() {
    this.challengeService.getChallenges().subscribe(challenges => this.challenges = challenges);
  }
}

