import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfigService } from '../config/app-config.service';
import { ChallengeModel } from '../_models/challenge-model';

@Injectable()
export class ChallengeService {
  constructor(private http: HttpClient) {}
  private apiServer = AppConfigService.settings.apiServer.metadata;
  private url = this.apiServer + 'challengeAPI/';
  
  getChallengeByUID(uid: string): Observable<ChallengeModel> {
    return this.http.get<ChallengeModel>(this.url + uid);
  }

  getChallenges(): Observable<ChallengeModel[]> {
    const url = this.apiServer + 'challengeAPI/';
    return this.http.get<ChallengeModel[]>(this.url);
  }
}