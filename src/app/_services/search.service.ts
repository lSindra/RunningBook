import { Injectable } from '@angular/core';
import { SearchResult } from '../_models/search-result-model';
import { UserService } from './user.service';
import { UserToSearchResult } from '../_models/converters/user-to-seach-result';

@Injectable()
export class SearchService {
  constructor(private userService: UserService,
              private userConverter: UserToSearchResult) {}

  searchWithFilter(filter: string): SearchResult[] {
    if (!filter) {return}
    const filterValue = filter.toLowerCase();

    let results;
    this.userService.getUsersByFilter(filterValue).subscribe(users => {
      results = this.userConverter.convertAll(users);
    });

    return results;
  }
}
