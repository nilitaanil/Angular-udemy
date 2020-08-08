import { NgModule } from '@angular/core';
// AppRoutingModule imports RouterModule and Routes 
// so the app can have routing functionality.
import { Routes, RouterModule } from '@angular/router';
// The next import, HeroesComponent, will give the Router 
// somewhere to go once you configure the routes.
import { HeroesComponent } from './heroes/heroes.component';
// Import the DashboardComponent in the AppRoutingModule.
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
// HttpClient is Angular's mechanism for communicating with a remote server over HTTP.
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';


// The next part of the file is where you configure your routes. 
// Routes tell the Router which view to display when a user clicks a link 
// or pastes a URL into the browser address bar.
const routes: Routes = [
  // Since AppRoutingModule already imports HeroesComponent, 
  // you can use it in the routes array

  // A typical Angular Route has two properties:
  // path: a string that matches the URL in the browser address bar.
  // component: the component that the router should create when navigating to this route.
  // This tells the router to match that URL to path: 'heroes' and display the HeroesComponent 
  // when the URL is something like localhost:4200/heroes.
  { path: 'heroes', component: HeroesComponent },
  // Add a route to the AppRoutingModule.
  // routes array that matches a path to the DashboardComponent.
  { path: 'dashboard', component: DashboardComponent },
  // To make the app navigate to the dashboard automatically, 
  // add the following route to the AppRoutingModule.Routes array.
  // This route redirects a URL that fully matches the empty path to 
  // the route whose path is '/dashboard'.
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  //  add a parameterized route to the AppRoutingModule.routes array 
  // that matches the path pattern to the hero detail view.
  // The colon (:) in the path indicates that :id is a placeholder for a specific hero id.
  { path: 'detail/:id', component: HeroDetailComponent }

];

// The @NgModule metadata initializes the router and starts it listening for browser 
// location changes.
@NgModule({
  // The following line adds the RouterModule to the AppRoutingModule imports array 
  // and configures it with the routes in one step by calling RouterModule.forRoot()
  //  forRoot() method supplies the service providers and directives needed for routing, 
  // and performs the initial navigation based on the current browser URL.
  imports: [RouterModule.forRoot(routes), HttpClientModule, 
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
