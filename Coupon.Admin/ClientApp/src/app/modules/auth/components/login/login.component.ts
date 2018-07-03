import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginFormFactoryService } from "src/app/modules/auth/services/login-form-factory.service";
import { UserDto } from "src/app/shared/data/user/user.dto";
import { AuthService } from "src/app/shared/services/auth.service";
import { NotificationService } from "src/app/shared/services/notifications.service";
import { BaseFormComponent } from "../../../../shared/components/base-form.component";
import { BadInputErrorsService } from "../../../../shared/services/bad-input-errors.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent extends BaseFormComponent implements OnInit {
  public username: FormControl;
  public password: FormControl;
  public submitClicked: boolean;
  private returnUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRout: ActivatedRoute,
    private notificationService: NotificationService,
    badInputService: BadInputErrorsService,
    formFactory: LoginFormFactoryService
  ) {
    super(formFactory, badInputService);
    this.createForm();
  }

  getControlNames(): string[] {
    return ["username", "password"];
  }

  ngOnInit() {
    this.activatedRout.queryParams.subscribe(params => {
      this.returnUrl = params["returnUrl"];
    });
  }

  onSubmit($event) {
    this.submitClicked = true;

    if (this.form.invalid) {
      return false;
    }

    this.authService
      .login(this.form.getRawValue())
      .subscribe(
        this.success.bind(this), 
        error => this.showServerErrors(error)
      );

    return false;
  }

  private success(user: UserDto) {
    this.authService.setCurrentUser(user);
    if (!this.returnUrl) {
      this.router.navigate(["/"]);
      return;
    }

    this.router.navigateByUrl(this.returnUrl);
  }
}
