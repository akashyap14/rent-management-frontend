import { Routes } from '@angular/router';
import { RentListComponent } from './components/rent-list/rent-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authenticationGuard } from './authentication.guard';
import { PropertyTypeComponent } from './components/property-type/property-type.component';
import { OtpLoginComponent } from './components/otp-login/otp-login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'verify-otp', component: OtpLoginComponent },
    { path: 'rents', component: RentListComponent, canActivate: [authenticationGuard] },
    {
        path: 'property-types',
        component: PropertyTypeComponent,
        canActivate: [authenticationGuard] // optional
    },
    { path: '**', redirectTo: 'rents' } // Redirect any unknown paths to rents
];
