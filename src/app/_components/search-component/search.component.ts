import { FriendsService } from './../../_services/friends.service';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor (private friendsService: FriendsService) {}

  searchConfig = {
    ...environment.algolia,
    indexName: 'user_search'
  };

  showResults = false;

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
}
