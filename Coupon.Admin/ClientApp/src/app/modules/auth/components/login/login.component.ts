import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserDto } from "src/app/shared/data/user/user.dto";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationService } from "src/app/shared/services/notifications.service";
import { HttpErrorResponse } from "@angular/common/http";
import { BadInputErrorsService } from "../../../../shared/services/bad-input-errors.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public username: FormControl;
  public password: FormControl;
  public submitted: boolean;
  private returnUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRout: ActivatedRoute,
    private notificationService: NotificationService,
    private badInputService: BadInputErrorsService
  ) {}

  ngOnInit() {
    this.activatedRout.queryParams.subscribe(params => {
      this.returnUrl = params["returnUrl"];
    });

    this.formInit();
  }

  private formInit() {
    this.username = new FormControl("", 
      [Validators.required]
    );
    this.password = new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ]);

    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  onSubmit($event) {
    $event.preventDefault();
    this.submitted = true;
    if (this.loginForm.invalid) {
      return false;
    }

    this.authService
      .login(this.loginForm.getRawValue())
      .subscribe(this.success.bind(this), (error=>{
        console.log(error);
        const httpError = error as HttpErrorResponse;
        if(httpError.status === 400){
          this.badInputService.showHttpError(httpError);
        } 
      }));

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
