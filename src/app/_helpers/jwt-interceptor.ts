import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if(currentUser && currentUser.token){
            req = req.clone({
                setHeaders:{
                    Authorization: `Bearer ${currentUser.token}`
                }
            })
        }
        return next.handle(req);
    }
}