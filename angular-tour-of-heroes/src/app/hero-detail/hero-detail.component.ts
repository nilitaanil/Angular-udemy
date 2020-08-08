// import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Component, OnInit, Input } from '@angular/core';

// Previously, the parent HeroesComponent set the HeroDetailComponent.hero property 
// and the HeroDetailComponent displayed the hero.

// HeroesComponent doesn't do that anymore. Now the router creates the HeroDetailComponent
//  in response to a URL such as ~/detail/11.

// The HeroDetailComponent needs a new way to obtain the hero-to-display. 
// This section explains the following:

// Get the route that created it
// Extract the id from the route
// Acquire the hero with that id from the server via the HeroService
// Add the following imports:
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  // Inject the ActivatedRoute, HeroService, and Location services into the constructor, 
  // saving their values in private fields:
  constructor(private route: ActivatedRoute,  private heroService: HeroService,
    private location: Location
  ) { }
  // The ActivatedRoute holds information about the route to this instance of the 
  // HeroDetailComponent. This component is interested in the route's parameters
  //  extracted from the URL. The "id" parameter is the id of the hero to display.

  // The HeroService gets hero data from the remote server and this component will use 
  // it to get the hero-to-display.

  // The location is an Angular service for interacting with the browser. 
  // You'll use it later to navigate back to the view that navigated here.
    

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    // The route.snapshot is a static image of the route information 
    // shortly after the component was created.
    // The paramMap is a dictionary of route parameter values extracted 
    // from the URL. The "id" key returns the id of the hero to fetch.
    // Route parameters are always strings. The JavaScript (+) operator 
    // converts the string to a number, which is what a hero id should be.
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
  @Input() hero: Hero;
  // You used the @Input decorator to make 
  // the hero property available for binding by the external HeroesComponent.

}
