import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private renderer: Renderer2
  ) { }

  @ViewChild('feedTile', { read: ElementRef })
  feedTile:ElementRef;

  readMore() {
    let element = this.feedTile.nativeElement;
    console.log(element);

    this.removeReadMoreButton(element);
    this.expand(element);
  }

  removeReadMoreButton(element) {
    const parent = element.firstChild.firstChild.firstChild;
    const child = element.firstChild.firstChild.firstChild.lastChild;
    this.renderer.removeChild(parent, child)
  }
  
  expand(element) {
    this.renderer.removeClass(element, "mat-grid-tile");
    this.renderer.setStyle(element, 'position', 'absolute');
    this.renderer.setStyle(element, 'display', 'table');
    
  }
}
