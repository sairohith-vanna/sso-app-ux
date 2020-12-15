import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor(private httpClient: HttpClient) { }

  getSampleResponse(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8081/secure/get', { observe: 'response', responseType: 'text' as 'json' });
  }

  getSampleDocument(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8081/secure/download', { observe: 'response', responseType: 'blob' as 'json'});
  }
}
