import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl: string = 'http://localhost:8089';

  constructor(private http: HttpClient) { }

  public getIDRequestData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/employee`);
  }
  public getAllRequestData(): Observable<any[]> {
    let links = [
      `${this.baseUrl}/employees`,
      `${this.baseUrl}/qualifications`
    ];
  
    let requests = links.map(link => this.http.get<any>(link));
    return forkJoin(requests);
  }

  public postRequestData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/employees`);
  }  
}


/* import { HttpClient, HttpHeaders } from '@angular/common/http';

const url = "http://keycloak.szut.dev/auth/realms/szut/protocol/openid-connect/token";
const headers = new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded'
});
const body = `grant_type=password&client_id=employee-management-service&username=user&password=test`;

this.http.post(url, body, { headers }).subscribe((response: any) => {
  const access_token = response.access_token;
  const url = "https://employee.szut.dev/employees";
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${access_token}`
  });

  this.http.get(url, { headers }).subscribe((data: any) => {
    console.log(data);
  });
});
 */




/* import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl: string = 'http://localhost:8089';

  constructor(private http: HttpClient) { }

  public getIDRequestData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/employee`);
  }
  public getAllRequestData(): Observable<any[]> {
    let links = [
      `${this.baseUrl}/employees`,
      `${this.baseUrl}/qualifications`
    ];
  
    let requests = links.map(link => this.http.get<any>(link));
    return forkJoin(requests);
  }

  public postRequestData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/employees`);
  }  
}
 */