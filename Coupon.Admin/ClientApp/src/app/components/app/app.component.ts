import { Component, OnInit, isDevMode, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NotificationService } from "../../shared/services/notifications.service";
import { ContextMenuComponent, ContextMenuService } from "ngx-contextmenu";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  notification: string;
  showNotification: boolean;

  constructor(
    private notificationService: NotificationService, 
    private contextMenuService: ContextMenuService
  ) {}

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
