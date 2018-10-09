import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../../_services/challenge.service';

@Component({
  selector: 'app-challenge-page',
  templateUrl: './challenge-page.component.html',
  styleUrls: ['./challenge-page.component.scss']
})
export class ChallengePageComponent implements OnInit {

  constructor(private challengeService: ChallengeService) { }

  ngOnInit() {
  }
  
}
