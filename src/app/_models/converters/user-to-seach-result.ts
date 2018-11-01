import { RunningUserModel } from '../user-model'
import { SearchResult } from '../search-result-model';

export class UserToSearchResult {
    convert(user: RunningUserModel): SearchResult {
        let result = new SearchResult;

        result.name = user.displayName;
        result.photo = user.photoURL;
        result.type = "friend";

        return result;
    }

    convertAll(users: RunningUserModel[]): SearchResult[] {
        let results = new Array<SearchResult>();

        users.forEach(user => {
            results.push(this.convert(user));
        });
        
        return results;
    }
}