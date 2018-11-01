import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfigService } from '../config/app-config.service';
import { RelationshipModel } from '../_models/relationship-model';
import { AuthService } from '../core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

enum Types {
  Request = 'request',
  Friend = 'friend',
  Block = 'block',
}

@Injectable()
export class FriendsService {
  constructor(private http: HttpClient, public auth: AngularFireAuth) {}
  private apiServer = AppConfigService.settings.apiServer.metadata;
  private url = this.apiServer + 'friendsAPI/';

  getMyRelations(): Observable<RelationshipModel[]> {
    console.log(this.auth.auth.currentUser.uid);
    return this.http.get<RelationshipModel[]>(this.url + 'my-relations/' + this.auth.auth.currentUser.uid);
  }

  getMyRelationsByType(type: string): Observable<RelationshipModel[]> {
    return this.http.get<RelationshipModel[]>(this.url + 'my-relations-with-type/' + this.auth.auth.currentUser.uid + ',' + type);
  }

  getRelationshipByRelatedUID(relatedUID: string): Observable<RelationshipModel> {
    return this.getRelationshipByBothUID(this.auth.auth.currentUser.uid, relatedUID);
  }

  getRelationshipByBothUID(relatingUID: string, relatedUID: string): Observable<RelationshipModel> {
    let params = new HttpParams();
    params = params.append('relationUser', relatingUID);
    params = params.append('relatedUser', relatedUID);
    return this.http.get<RelationshipModel>(this.url, {params});
  }

  updateOrCreateRelationshipByBothUID(relatingUID: string, relatedUID: string, type: string) {
    const relationship = new RelationshipModel;
    relationship.relationUser = relatingUID;
    relationship.relatedUser = relatedUID;
    relationship.type = type;

    return this.http.post<RelationshipModel>(this.url, relationship, httpOptions)
      .subscribe(
        data => {
            console.log('POST Request is successful ', data);
        },
        error => {
            console.log('Error', error);
        }
    );
  }

  addFriend(relatedUID: string) {
    const type = Types.Request;
    this.updateOrCreateRelationshipByBothUID(this.auth.auth.currentUser.uid, relatedUID, type);
  }
}
