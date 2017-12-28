import {Directive, OnDestroy, Inject} from '@angular/core';

import {Location} from '@angular/common'
import {AuthService} from '../../core/services/auth.service';



@Directive({
    selector: '[protected]',

})
export class ProtectedDirective implements OnDestroy {
    private sub:any = null;

    constructor(@Inject(AuthService)  authService:AuthService, private router:any, private location:Location) {
        console.log("protected");
/*
        if (!authService.isAuthenticated()) {
            let originRoute=router.hostComponent.name;
            console.log("protected not auth");
            this.location.replaceState('/'); // clears browser history so they can't navigate with back button
            this.router.navigate(['Login', {redirect:originRoute}]);
        }

        this.sub = authService.subscribe((val) => {
            console.log("protected sub");
            if (!val.authenticated) {
                console.log("protected not auth not auth");
                this.location.replaceState('/'); // clears browser history so they can't navigate with back button
                // this.router.navigate(['LoggedoutPage']); // tells them they've been logged out (somehow)
            }
        });*/
    }

    ngOnDestroy() {
        if (this.sub != null) {
            this.sub.unsubscribe();
        }
    }
}
