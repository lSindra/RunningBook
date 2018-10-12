import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfigService } from '../config/app-config.service';
import { RelationshipModel } from '../_models/relationship-model';

@Injectable()
export class FriendsService {
  constructor(private http: HttpClient) {}
  private apiServer = AppConfigService.settings.apiServer.metadata;
  private url = this.apiServer + 'friendsAPI/';

  getFriendsByUID(uid: string): Observable<RelationshipModel[]> {
    return this.http.get<RelationshipModel[]>(this.url + uid);
  }
  
  getFriendsByUIDAndType(uid: string, type: string): Observable<RelationshipModel[]> {
    return this.http.get<RelationshipModel[]>(this.url + uid + '/' + type);
  }

  getRelationshipByBothUID(relatingUID: string, relatedUID: string): Observable<RelationshipModel> {
    return this.http.get<RelationshipModel>(this.url + relatingUID + '/' + relatedUID);
  }
}