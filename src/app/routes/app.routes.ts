import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MoviesComponent } from '../movies/movies.component';
import { ContactComponent } from '../contact/contact.component';
import { LoggedInGuard } from '../services/impl/logged-in-guard';

import { LoginComponent } from '../login/login.component';

export const ROUTES: Routes = [
    { path: '',component: HomeComponent },
    { path: 'movies', component: MoviesComponent,canActivate: [ LoggedInGuard ] },
    { path: 'contact', component: ContactComponent },
    { path: 'redirect-to-movies', redirectTo: '/movies' },
    { path: 'login', component: LoginComponent },
 
];