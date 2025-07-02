import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';

@Directive({
  selector: '[appHasRole]' // *appHasRole=["Admin", "Thing"]
})
export class HasRoleDirective {
  @Input() appHasRole:string[]=[];
  user:User= {} as User;

  ngOnInit():void{
    if(this.user.roles.some(r=>this.appHasRole.includes(r)))
    {
      this.ViewContainerRef.createEmbeddedView(this.templateRef);
    }
    else{
      this.ViewContainerRef.clear()
    }
  }

  constructor(private ViewContainerRef:ViewContainerRef,private templateRef:TemplateRef<any>,
    private accountService:AccountService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe({
        next:user=>{
          if(user) this.user=user
        }
      })
     }

}
