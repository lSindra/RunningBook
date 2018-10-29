import { NotificationModel } from './../../_models/notification-model';
import { NotificationsService } from './../../_services/notifications.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  constructor(private notificationsService: NotificationsService) { }

  awaitingNotifications: number;
  notifications: NotificationModel[];

  ngOnInit(): void {
    this.initNotifications();

    setInterval(() => {
      this.updateNotifications();
    }, 1000);
  }

  initNotifications() {
    this.notificationsService.getMyNotifications().subscribe(notifications => {
      if (notifications) {
        this.notifications = notifications;
        this.setNewNotificationCount(notifications.length);
      }
    });
  }

  updateNotifications() {
    this.notificationsService.getMyNotifications().subscribe(notifications => {
      notifications.forEach(notification => {
        if (!this.notifications.includes(notification)) {
          this.notifications.push(notification);
        }
      });
    });
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
