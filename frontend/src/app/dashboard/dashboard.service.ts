import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    token: any = localStorage.getItem('token');
    API_BASE = environment.apiBase;


    constructor(private http: HttpClient,
    ) { }

    getHttpOption(token: any) {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'access-token': token
            })
        };
    }

    getAllUsers(props: any) {
        const url = `${this.API_BASE}/users`;
        return this.http.put(url, props, this.getHttpOption(this.token));
    }
}
