import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  constructor() { }

  @Output()
  onReadMore: EventEmitter<any> = new EventEmitter()
  
  readMore() {
    console.log("read");
    //delete button

    //expand
    this.onReadMore.emit();
  }

}
