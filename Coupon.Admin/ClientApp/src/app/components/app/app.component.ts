import { Component, OnInit, isDevMode } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NotificationService } from "../../shared/services/notifications.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  notification: string;
  showNotification: boolean;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    if (isDevMode() === false) {
      this.notificationService.notification$.subscribe(message => {
        this.notification = message;
        this.showNotification = true;
      });
    }
  }

  public isDevMode():boolean{
    return isDevMode();
  }
}
