import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking-overview',
  templateUrl: './ranking-overview.component.html',
  styleUrls: ['./ranking-overview.component.scss']
})
export class RankingOverviewComponent implements OnInit {
  constructor() { }

  todos = [
    {
      face : "",
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in"
    },
    {
      face : "",
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in"
    },
    {
      face : "",
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in"
    },
    {
      face : "",
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in"
    },
    {
      face : "",
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in"
    },
  ];

  ngOnInit() {
  }

}
