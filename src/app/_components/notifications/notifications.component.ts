import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  constructor() { }

  awaitingNotifications: number;
  unreadNotifications: Notification[];
  readNotifications: Notification[];

  ngOnInit(): void {
    this.setNewNotificationCount(0);
  }

  showNotifications(event) {}

  setNewNotificationCount(count: number) {
    if (count <= 0) {
      this.awaitingNotifications = null;
    } else {
      this.awaitingNotifications = count;
    }
  }

  clearNewNotificationsCount() {
    this.awaitingNotifications = null;
  }
}
