import { FriendsService } from './../../_services/friends.service';
import { NotificationModel } from './../../_models/notification-model';
import { NotificationsService } from './../../_services/notifications.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  constructor(private notificationsService: NotificationsService, private friendsService: FriendsService) { }

  showNotificationsDropdown: boolean;
  awaitingNotifications: number;
  notifications: NotificationModel[];

  ngOnInit(): void {
    this.showNotificationsDropdown = false;
    this.initNotifications();

    setInterval(() => {
      this.initNotifications();
    }, 10000);
  }

  initNotifications() {
    this.notificationsService.getMyNotifications().subscribe(notifications => {
      if (notifications) {
        this.notifications = notifications;
        this.setNewNotificationCount(notifications.length);
      }
    });
  }

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

  addFriend(sender, notificationUID) {
    this.friendsService.addFriend(sender);
    this.dismissNotification(notificationUID);
  }

  dismissNotification(notificationUID) {
    this.notifications = this.notifications.filter(currentNotification => {
      return notificationUID !== currentNotification.uid;
    });
    this.setNewNotificationCount(this.notifications.length);
    this.notificationsService.dismisNotificationByUID(notificationUID);
  }
}
