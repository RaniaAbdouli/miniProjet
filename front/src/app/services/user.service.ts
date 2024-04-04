import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  createUser(userData: FormData): Observable<User> {
    return this.http.post<User>(`${environment.backendHost}/users`, userData);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.backendHost}/users`);
  }

  
  getUserAvatar(id: number) {
    return this.http.get(`${environment.backendHost}/users/${id}/avatar`, { responseType: 'blob' });
  }
}
