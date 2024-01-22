import axios, { AxiosResponse } from 'axios';
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

  private async requestData(method: RequestMethod, useKeyCloak : boolean = false, substring :string = "", bodyData: string = "") {    
      let url: string;
      let response;
      if(useKeyCloak){
        url = this.baseUrlKC + "/employees" + substring;
        let access_token = await this.getAccessToken();
        
        let headers = {
          "Authorization" : `Bearer ${access_token}`
        }
        switch(method){
          default: response = await axios.get(url, {headers}).catch((error) => console.error("Error during KeyCloak GET request: "+ error.message)); break;
          case RequestMethod.POST: response = await axios.post(url, bodyData, {headers}).catch((error) => console.error("Error during KeyCloak POST request: "+ error.message)); break;
          case RequestMethod.PUT: response = await axios.put(url, bodyData, {headers}).catch((error) => console.error("Error during KeyCloak UPDATE request: "+ error.message)); break;
          case RequestMethod.DELETE: response = await axios.delete(url, {headers}).catch((error) => console.error("Error during KeyCloak DELETE request: "+ error.message)); break;
        }
      }
      else{
        url = this.baseUrl + "/employees" + substring;
        switch(method){
          default: response = await axios.get(url).catch((error) => console.error("Error during GET request: "+ error.message)); break;
          case RequestMethod.POST: response = await axios.post(url, bodyData).catch((error) => console.error("Error during POST request: "+ error.message)); break;
          case RequestMethod.PUT: response = await axios.put(url, bodyData).catch((error) => console.error("Error during UPDATE request: "+ error.message)); break;
          case RequestMethod.DELETE: response = await axios.delete(url).catch((error) => console.error("Error during DELETE request: "+ error.message)); break;
        } 
      }  
      if(response != undefined && response.status == 200){ 
           
        return response.data;      
      }
      else if (response != undefined){
        return "Status Code: " + response.status;
      }
      return "Unable to find data";
  }

  public newEmployee(useKeyCloak = false, body: string): Promise<any[]> { 
    return this.requestData(RequestMethod.POST, useKeyCloak, "", body)
  } 
  
  public getEmployeeByID(useKeyCloak = false, id: number): Promise<any[]> { 
    return this.requestData(RequestMethod.GET, useKeyCloak, "/" + id.toString())
  } 

  public getAllEmployees(useKeyCloak = false): Promise<any[]> { 
    return this.requestData(RequestMethod.GET, useKeyCloak)         
  } 

  public updateEmployee(useKeyCloak = false, id: number, body: string): Promise<any[]> { 
    return this.requestData(RequestMethod.PUT, useKeyCloak, "/" + id.toString(), body)
  } 

  public deleteEmployeeByID(useKeyCloak = false, id: number): Promise<any[]> { 
    return this.requestData(RequestMethod.DELETE, useKeyCloak, "/" + id.toString())
  } 

}    
