import { FriendsService } from './../../_services/friends.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RelationshipModel } from 'src/app/_models/relationship-model';

@Component({
  selector: 'app-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor (private friendsService: FriendsService) {}

  searchConfig = {...environment.algolia,
                  indexName: 'user_search'};
  relations: RelationshipModel[];
  showResults = false;

  ngOnInit(): void {
    this.getRelationList();
  }

  searchChanged(query) {
    if (query.length) {
      this.showResults = true;
    } else if (query.length <= 0) {
      this.showResults = false;
    }
  }

  reset() {
    this.showResults = false;
  }

  onBlur(event) {
    if (event.relatedTarget) {
      const target = event.relatedTarget.classList;
      if (!target.value.includes('search-result') && !target.value.includes('add-friend')) {
        this.reset();
      }
    } else {
      this.reset();
    }
  }

  addFriend(event, uid: string) {
    event.stopPropagation();
    this.friendsService.addFriend(uid);
  }

  getUserRelation(uid: string): string {
    if (this.relations) {
      const relation = this.relations.find(function(friend) {
        return friend.relatedUser === uid;
      });

      if (relation) {
        return relation.type;
      } else {
        return;
      }
    } else {
      return;
    }
  }

  private getRelationList() {
    this.friendsService.getMyRelations().subscribe(relations => { this.relations = relations; });
  }
}
