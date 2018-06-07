import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { UserDto } from "../data/user/user.dto";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { HttpService } from "../../modules/shared/services/http.service";

@Injectable({
  providedIn: "root"
})
export class AuthService implements OnInit {
  private readonly keyName = "currentuser";
  public readonly userChanged : Subject<UserDto>; 

  constructor(private http: HttpService) {
    this.userChanged = new Subject<UserDto>();
  }

  ngOnInit(): void {
  }

  logout(): void {
        this.setCurrentUser(null);
  }

  public login(data: string): Observable<UserDto> {
    var user$ = this.http.post<UserDto>('/auth/login', data)
      .pipe(
        map(response => {
          if (response.status === 204) {
            throw new Error("Неправильно указано имя пользователя или пароль");
          }

          var user = response.body as UserDto;
          if (user === null) {
            console.error("Формат данных не распознан", response.body);
            throw new Error("Формат данных не распознан");
          }

          return user;
        })
      );

    return user$;
  }

  public isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  public getCurrentUser(): UserDto {
    return JSON.parse(window.localStorage.getItem(this.keyName)) as UserDto;
  }

  public setCurrentUser(user: UserDto) {
    window.localStorage.setItem(this.keyName, JSON.stringify(user));
    this.userChanged.next(user);
  }
}
