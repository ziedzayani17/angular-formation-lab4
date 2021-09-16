# LAB 4
## _Les points à voir :_

- Navigation et routing

<br/>

## _prérequis :_

- Récuperer le code du LAB1 (https://github.com/ziedzayani17/angular-formation-lab3.git)

<br/>
<br/>

### 1. Créer deux nouveaux composants HomeComponent et ContactComponent

```sh
ng generate component home
ng generate component contact
```
<br/>
<br/>
  
### 2. Créer un fichier *app.routes.ts* dans le répertoire *src/app/routes* et ajouter un tableau représentant la configuration des routes

<br/>
<br/>

```js
import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MoviesComponent } from '../movies/movies.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'movies', component: MoviesComponent },
    { path: 'contact', component: ContactComponent },
];
```
<br>

### 3.a Importer le module routeur et les routes dans le module racine *AppModule* initialisé avec les routes *app.routes.ts*

<br>

```js
import { RouterModule } from '@angular/router';
import {ROUTES } from './routes/app.routes';
```
<br>

### 3.b charger les routes avec *RouterModule.forRoot(ROUTES)*

<br>

```js
imports: [
    BrowserModule, RouterModule.forRoot(ROUTES)
  ],
```
<br>

### 3.c Il faut aussi déclarer tous les composants utilisés par le routeur dans les declarations du module racine.

<br>

> Les Routes sont un tableau d’objets,  la configuration de route est en général une paire :<br>
>  • path : quelle URL va déclencher la navigation.<br>
>  • component : quel composant sera initialisé et affiché.<br>

<br>

### 4. Il faut utiliser le tag *<router-outlet></router-outlet>*  dans le template du composant principal pour réserver l'emplacement dans lequel le composant sera afficher

<br>

```html
<header>
    <nav></nav>
</header>
<main>
    <!-- Le composanr sera afficher ici-->
    <router-outlet></router-outlet>
</main>
<footer></footer>
```

<br>

>le header, le main, et le footer restera fixe, et le composant correspondant à la route sera inséré à la suite de la directive RouterOutlet.
>
>

<br>

### 5. Tester les deux routes

<br>


### 6. Redirection, ajouter une URL dans la route qui redirige simplement vers une autre URL

<br>

```js
{ path: 'redirect-to-movies', redirectTo: '/movies' },
```
<br>

<br>


### 6. Navigation, ajouter un menu pour la navigation

<br>

```html
<header>
    <nav>

        <div class="ui inverted menu">
            <a class="active item" routerLink="/" >
              Home
            </a>
            <a class="item" routerLink="/movies">
              Movies
            </a>
            <a class="item" routerLink="/contact">
              Contact 
            </a>
        </div>
    </nav>
</header>
```

<br>


### 7. Guards

>Certaines routes de l’application ne devraient  être accessibles que pou  un utilisateur 
>authentifié, il faut désactiver ou masquer les liens pointant sur ces routes inaccessibles.
> c'est le role de Guards, les Guards est :
>  • CanActivate : permet d'empêcher l’activation de la route<br>
>  • CanActivateChild : Ce guard peut empêcher les activations des enfants de la route sur lequel il est appliqué<br>
>  • CanLoad : à voir avec le lazyloading des modules<br>
>  • CanDeactivate : ce guard est différent des trois autres. Il est utilisé pour empêcher de quitter la route actuelle. Cela peut être utile pour, par exemple, demander une confirmation avant de quitter une page contenant un long formulaire.<br>


 > avant de commencer Guard, on va créer un comosant d'authentification


```sh
ng generate component login
```
<br>

### 7.1 Créer un service d'authentification

## Dans le répertoire src/app/services/impl, créer le service *authService:* ##

<br>

```js
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

    login(user: string, password: string): boolean {
        if (user === 'admin' && password === 'admin') {
            localStorage.setItem('username', user);
            return true;
        }

        return false;
    }

    logout(): any {
        localStorage.removeItem('username');
    }

    getUser(): any {
        return localStorage.getItem('username');
    }

    isLoggedIn(): boolean {
        return this.getUser() !== null;
    }

}
```
<br>

### 7.2 modifier LoginComponent, injecter le service AuthService et ajouter une méthode de login et une autre logout 

<br>

```js

onstructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  login(username: string, password: string): boolean {
    this.message = '';
    
    if (!this.authService.login(username, password)) {
      this.message = 'Login ou mot de passe incorrecte';
    }
    return false;
  }

  logout(): boolean {
    this.authService.logout();
    return false;
  }

```

<br>

### 7.3 modifier le template de LoginComponent 

<br>

```html
<div style="margin-top: 20px;margin-left: auto;margin-right: auto;width: 25%;" class="ui placeholder segment">
    <div class="ui column very relaxed stackable grid">
      <div class="column">
        <div class="ui form" *ngIf="!authService.getUser()">
          <div class="field">
            <label>Login</label>
            <div class="ui left icon input">
              <input type="text" placeholder="login" #username>
              <i class="user icon"></i>
            </div>
          </div>
          <div class="field">
            <label>Mot de passe</label>
            <div class="ui left icon input">
              <input type="password" #password>
              <i class="lock icon"></i>
            </div>
          </div>
          <div class="ui blue submit button" (click)="login(username.value, password.value)" >Connexion</div>
        </div>
        <div class="well" *ngIf="authService.getUser()">
             <b style="margin-left: 27%;">{{ authService.getUser() }} est l'utilisateur connecté</b>
             <div class="ui blue submit button" (click)="logout()" >Déconnexion</div>
        </div>
        <div class="ui negative message" *ngIf="message">
            <i class="close icon"></i>
            <div class="header">
             Problème de connexion
            </div>
            <p>{{message}}
          </p></div>
      </div>
    </div>
  </div>

```


<br>

### 7.4 Ajouter LoginComponent dans la liste de routes

<br>

<br>

### 7.5 Créer un Guard de type CanActivate (créer un service dans le répertoire */src/app/services/impl*)

<br>

**Voici le contenue fichier *logged-in-guard.ts***

> vous pouver utiliser angular cli *ng generate guard logged-in*
>

<br>

```js
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {
    constructor(private authService: AuthService) { }

    canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
        return this.authService.isLoggedIn();
    }

}
```

<br>

### 7.6 Configurer la route */movies* pour utiliser *LoggedInGuard* 

<br>

```js
 { path: 'movies', component: MoviesComponent,canActivate: [ LoggedInGuard ] },
```

### 7.7 Paramétre et données ***

**voici comment déclarer une route avec paramétre**

```js
{ path: 'movie/:id', component: MovieComponent },
```

**pour récupere le paramétre :**

```js
id: string;
constructor(private route: ActivatedRoute) {
route.params.subscribe(params => { this.id = params['id']; });
}
```



