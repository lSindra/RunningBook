import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchConfig = {
    ...environment.algolia,
    indexName: 'user_search'
  }

  showResults = false;

  searchChanged(query) {
    if (query.length) {
      this.showResults = true;
    } else {
      this.showResults = false;
    }
  }
}
