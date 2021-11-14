import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class RegisterViewService {

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

    getUser(id: any = null) {
        const url = `${this.API_BASE}/users${id ? `/${id}` : ''}`;
        return this.http.get(url, this.getHttpOption(this.token));
    }

    updateUser(data: any) {
        const url = `${this.API_BASE}/users/update`;
        return this.http.put(url, data, this.getHttpOption(this.token));
    }

    deleteUser(id: any) {
        const url = `${this.API_BASE}/users/delete/${id}`;
        return this.http.delete(url, this.getHttpOption(this.token));
    }
}
