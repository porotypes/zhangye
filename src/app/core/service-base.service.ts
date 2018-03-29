import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export abstract class ServiceBaseService<T> {

  API_URL: string = environment.api_url;
  api_url: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.api_url = this.API_URL;
    this.getHeader();
  }

  private getHeader(): HttpHeaders {
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem('token'));
    return headers;
  }

  get(url: string, request?: HttpParams): Promise<T> {
    return this.http.get(this.api_url + url, { headers: this.getHeader(), params: request })
      .toPromise()
      .then(response => {
        return response['result'];
      })
      .catch(error => this.responseError(error.error));
  }

  getAll(url: string, request?: HttpParams): Promise<T[]> {
    return this.http.get(this.api_url + url, { headers: this.getHeader(), params: request })
      .toPromise()
      .then(response => {
        return response['result'];
      })
      .catch(error => this.responseError(error.error));
  }

  put(url: string, request: Object = {}): Promise<T> {
    return this.http.put(this.api_url + url, request, { headers: this.getHeader() })
      .toPromise()
      .then(response => {
        return response['result'];
      })
      .catch(error => this.responseError(error.error));
  }

  post(url: string, request: Object = {}): Promise<T> {
    return this.http.post(this.api_url + url, request, { headers: this.getHeader() })
      .toPromise()
      .then(response => {
        return response['result'];
      })
      .catch(error => this.responseError(error.error));
  }

  delete(url: string): Promise<T> {
    return this.http.delete(this.api_url + url, { headers: this.getHeader() })
      .toPromise()
      .then(response => {
        return response['result'];
      })
      .catch(error => this.responseError(error.error));
  }

  patch(url: string, request: Object = {}): Promise<T> {
    return this.http.patch(this.api_url + url, request, { headers: this.getHeader() })
      .toPromise()
      .then(response => {
        return response['result'];
      })
      .catch(error => this.responseError(error.error));
  }

  responseError(error): void {
    console.log(error);
  }
}
