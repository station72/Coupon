import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserDto } from "src/app/shared/data/user/user.dto";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router } from "@angular/router";

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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = new FormControl("admin", [Validators.required]);
    this.password = new FormControl("111111", [
      Validators.required,
      Validators.minLength(6)
    ]);

    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.getRawValue())
      .subscribe(this.success.bind(this), this.error.bind(this));
  }

  private success(user: UserDto){
    this.authService.setCurrentUser(user);
    this.router.navigate(['/']);
  }

  private error(error: Error){
    alert(error.message);
  }
}
