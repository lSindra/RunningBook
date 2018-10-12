import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SearchService } from 'src/app/_services/search.service';
import { SearchResult } from 'src/app/_models/search-result-model';

@Component({
  selector: 'app-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  resultCtrl = new FormControl();
  filteredResults: Observable<SearchResult[]>;

  constructor(private searchService: SearchService) {
    this.filteredResults = this.resultCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => this.searchService.searchWithFilter(state))
    );
  }
}
