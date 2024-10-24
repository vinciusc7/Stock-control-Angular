import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { AuthRequest } from 'src/app/models/interfaces/user/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/user/AuthResponse';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { SignupUserResponse } from 'src/app/models/interfaces/user/SignupUserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }

  signupUser(requestData: SignupUserRequest): Observable<SignupUserResponse>{
    return this.http.post<SignupUserResponse>(
      `${this.API_URL}/user`, requestData
    );
  }

  authUser(requestData: AuthRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(
      `${this.API_URL}/auth`, requestData
    );
  }
}
