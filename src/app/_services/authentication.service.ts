import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private config = environment.config;
  constructor(private http: HttpClient) { }

  login(username: String, password: String) {
    return this.http.post<any>(
      `${this.config.apiUrl}/users/authenticate`,
      { username: username, password: password }
    ).pipe(
      map(user => {
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
    )
  }

  logout() {
    localStorage.removeItem("currentUser");
  }
}
