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
      if (!target.value.includes('search-result')) {
        this.reset();
      }
    } else {
      this.reset();
    }
  }
}
