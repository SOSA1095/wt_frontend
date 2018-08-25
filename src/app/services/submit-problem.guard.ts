import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { AuthService } from "./auth.service";

@Injectable()
export class SubmitProblemGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
  	// console.log("RUTA");
  	// console.log(route);
    return this.authService.isValidProblem(route['params']['id']).first();
  }
}
