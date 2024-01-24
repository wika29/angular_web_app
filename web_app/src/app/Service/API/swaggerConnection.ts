import axios, { Axios, AxiosResponse } from 'axios';
import { Injectable } from '@angular/core';

export enum RequestMethod {
  GET,
  POST,
  PUT,
  DELETE
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private data: string = "";
  public readonly baseUrl: string = 'http://localhost:8089' //Docker local build
  public readonly baseUrlKC: string = 'https://employee.szut.dev'  //Online mit KeyCloak
 
  private async getAccessToken(): Promise<string> {
    let url = "https://keycloak.szut.dev/auth/realms/szut/protocol/openid-connect/token";
    let headers: Record<string,string> = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    let data: Record<string,string>= {
      'grant_type': 'password',
      'client_id': 'employee-management-service',
      'username': 'user',
      'password': 'test',
    }
    try{
        let access_token: string = "";
        let response = await axios.post(url, data, {headers})
        access_token = response.data['access_token']  
        return access_token
    }catch(error: any){
        console.error('Error loading access Token: ', error.message)
        return "";
    }
  }

  private async requestData(method: RequestMethod, useKeyCloak : boolean = false, substring :string = "", bodyData = {}): Promise<AxiosResponse> {    
      let url: string;
      let axiosReponse: Promise<AxiosResponse>;
      if(useKeyCloak){
        url = this.baseUrlKC + "/employees" + substring;
        let access_token = await this.getAccessToken();
        
        let headers = {
          "Authorization" : `Bearer ${access_token}`
        }
        switch(method){
          default: axiosReponse = axios.get(url, {headers}).catch((error) => {console.error("Error during KeyCloak GET request: "+ error.message); return Promise.reject(error);}); break;
          case RequestMethod.POST: axiosReponse = axios.post(url, bodyData, {headers}).catch((error) => {console.error("Error during KeyCloak POST request: "+ error.message); return Promise.reject(error);}); break;
          case RequestMethod.PUT: axiosReponse = axios.put(url, bodyData, {headers}).catch((error) =>{ console.error("Error during KeyCloak UPDATE request: "+ error.message); return Promise.reject(error);}); break;
          case RequestMethod.DELETE: axiosReponse = axios.delete(url, {headers}).catch((error) => {console.error("Error during KeyCloak DELETE request: "+ error.message); return Promise.reject(error);}); break;
        }
      }
      else{
        url = this.baseUrl + "/employees" + substring;
        switch(method){
          default: axiosReponse = axios.get(url).catch((error) => {console.error("Error during GET request: "+ error.message); return Promise.reject(error);}); break;
          case RequestMethod.POST: axiosReponse = axios.post(url, bodyData).catch((error) => {console.error("Error during POST request: "+ error.message); return Promise.reject(error);}); break;
          case RequestMethod.PUT: axiosReponse = axios.put(url, bodyData).catch((error) =>{ console.error("Error during UPDATE request: "+ error.message); return Promise.reject(error);}); break;
          case RequestMethod.DELETE: axiosReponse = axios.delete(url).catch((error) =>{ console.error("Error during DELETE request: "+ error.message); return Promise.reject(error);}); break;
        } 
      }
      return axiosReponse.then(
        (response) => response,
        (error) => {
          let message = "Couldn't read Axios response: ";
          console.error(message + error);
          throw error; // Rethrow the error to propagate it to the caller
        }
      );
    
    }

  public newEmployee(useKeyCloak = false, body = {}): Promise<AxiosResponse> { 
    return this.requestData(RequestMethod.POST, useKeyCloak, "/", body);
  } 
  
  public getEmployeeByID(useKeyCloak = false, id: string): Promise<AxiosResponse> { 
    return this.requestData(RequestMethod.GET, useKeyCloak, "/" + id.toString());
  } 

  public getAllEmployees(useKeyCloak = false): Promise<AxiosResponse> { 
    return this.requestData(RequestMethod.GET, useKeyCloak); 
  } 

  public updateEmployee(useKeyCloak = false, id: string, body = {}): Promise<AxiosResponse> { 
    return this.requestData(RequestMethod.PUT, useKeyCloak, "/" + id.toString(), body);
  } 

  public deleteEmployeeByID(useKeyCloak = false, id: string): Promise<AxiosResponse> { 
    return this.requestData(RequestMethod.DELETE, useKeyCloak, "/" + id.toString());
  } 

}    
