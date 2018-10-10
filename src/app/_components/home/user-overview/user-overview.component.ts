import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent {

  constructor(public element: ElementRef<HTMLElement>) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.element.nativeElement.firstElementChild.classList.add('hovering');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.element.nativeElement.firstElementChild.classList.remove('hovering');
  }

}
