import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component:MemberEditComponent):boolean => {
  if(component.editForm?.dirty){
    return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
  }
  return true;
};
