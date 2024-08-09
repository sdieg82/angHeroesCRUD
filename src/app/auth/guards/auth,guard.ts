import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch,CanActivate {
    constructor(
        private authService:AuthService,
        private router:Router
    ) { }
   

    private checkAuthStatus():boolean| Observable<boolean>{
        return this.authService.checkAutentication()
        .pipe(
            tap(isAuthenticated=>{
                if(!isAuthenticated)
                    this.router.navigate(['./auth/login'])
            })
        )
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean | UrlTree {
   return   this.checkAuthStatus(); 
 }
    
    canMatch(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean  {
        return   this.checkAuthStatus(); 
    }
    
}