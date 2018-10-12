import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchResult } from 'src/app/_models/search-result-model';
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

  resultCtrl = new FormControl();
  filteredResults: Observable<SearchResult[]>;

  constructor() {}
}
