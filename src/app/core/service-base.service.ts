import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  }

  private getHeader(): HttpHeaders {
    const header: HttpHeaders = new HttpHeaders();
    header.append('Authorization', localStorage.getItem('token'));
    return header;
  }

  get(url: string, request: Object = {}): Promise<T> {
    return this.http.get(this.api_url + url, { headers: this.getHeader(), params: request })
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => this.responseError(error.json()));
  }

  getAll(url: string, request: Object = {}): Promise<T[]> {
    return this.http.get(this.api_url + url, { headers: this.getHeader(), params: request })
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => this.responseError(error.json()));
  }

  put(url: string, request: Object = {}): Promise<T> {
    return this.http.put(this.api_url + url, request, { headers: this.getHeader() })
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => this.responseError(error.json()));
  }

  post(url: string, request: Object = {}): Promise<T> {
    return this.http.post(this.api_url + url, request, { headers: this.getHeader() })
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => this.responseError(error.json()));
  }

  responseError(error): void {

  }
}
