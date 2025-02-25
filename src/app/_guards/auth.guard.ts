import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { CanActivate } from '@angular/router';
// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate{
  constructor(private accountservice:AccountService,private toastr:ToastrService){}
  canActivate(): Observable<boolean>{
    return this.accountservice.currentUser$.pipe(
      map(user=>{
        if(user) {
          return true;
        }
        else{
          this.toastr.error('You shall not pass!');
          return false;
        }
      })
    )

  }
}
