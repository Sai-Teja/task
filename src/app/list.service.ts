import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './list/list.component';
import { Observable, Subject } from 'rxjs';
import { LiquidCache } from 'ngx-liquid-cache';

export const cacheBuster$ = new Subject<void>();

export class ContentSource {
  constructor(public page: number, public per_page: number, public total: number, public total_pages: number, public data: User[]) { }
}

export class ContentSource2 {
  constructor(public data: User) {}
}

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private _http: HttpClient) { }

  @LiquidCache('users{page}')
  public getUsers(page: number): Observable<ContentSource> {
    return this._http.get(`https://reqres.in/api/users?page=${page + 1}`) as Observable<ContentSource>;
  }

  @LiquidCache('user{id}')
  public getUser(id: number): Observable<ContentSource2> {
    return this._http.get(`https://reqres.in/api/users/${id}`) as Observable<ContentSource2>;
  }
}
