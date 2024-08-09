import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService implements OnInit {
    
    private baseUrl=environments.baseUrl
    private user?:User
    
    get currentUser():User | undefined{
        if(!this.user) return undefined;
        return structuredClone(this.user)

    }

    login(user:string,password:string):Observable<User>{
        return this.http.get<User>(`${this.baseUrl}/users/1`)
        .pipe(
            tap(user=>this.user=user),
            tap(user=>localStorage.setItem('token','asdfFSAsd')),
                
        )
    }

    checkAutentication():Observable<boolean>{
        if(!localStorage.getItem('token')) return of(false);
        const token=localStorage.getItem('token')
        return this.http.get<User>(`${this.baseUrl}/users/1`)
        .pipe(
            tap(user=>this.user=user),
            map(user=>!!user),
            catchError(err=>of(false))
        )

    }
    
    
    constructor(private http: HttpClient) { }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
    logOut():void{
        this.user=undefined
        localStorage.clear();
    }
    
}