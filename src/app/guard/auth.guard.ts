import { inject } from "@angular/core"
import { UserService } from "../services/users.service"
import { Router } from "@angular/router";

export const authGuardFn = () => {
    const logService = inject(UserService);
    const router = inject(Router);

    logService.loggedUserId$.subscribe({
        next: (response) => {
            if(response === null){
                router.navigate(['']);
                return false;
            }else{
                return true;
            }
        },
        error: () => {
            console.log('Suscription error');
        }
    })
}