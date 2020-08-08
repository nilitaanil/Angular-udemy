import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
// putting the service instead of this
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // constructor() { }
  //  constructor(private heroService: HeroService) {}
  // The parameter simultaneously defines a private heroService property 
  // and identifies it as a HeroService injection site.
  // When Angular creates a HeroesComponent, the Dependency Injection system 
  // sets the heroService parameter to the singleton instance of HeroService.
  // constructor(private heroService: HeroService) {}

  // The following example shows how to send and display a message each time the user clicks
  //  on a hero, showing a history of the user's selections. 
  // This will be helpful when you get to the next section on Routing.
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  // ngOnInit(): void {
  // }

  // call getHeroes() inside the ngOnInit lifecycle hook and let Angular call ngOnInit() 
  // at an appropriate time after constructing a HeroesComponent instance.
  ngOnInit() {
    this.getHeroes();
  }

  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };
  //define a component property called heroes to expose the HEROES array for binding
  // heroes = HEROES; 

  heroes: Hero[];
  // selectedHero: Hero;  No longer used after editing heroes.component.html

  // Create a method to retrieve the heroes from the service.
  // HeroService can fetch heroes synchronously
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  // No longer used

  // onSelect(hero: Hero): void 
  // {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`); // added later
  // }



  // When the given name is non-blank, the handler creates 
  //   a Hero-like object from the name (it's only missing the id) and passes it to the 
  //   services addHero() method.

  // When addHero() saves successfully, the subscribe() callback receives the new hero and 
  // pushes it into to the heroes list for display.
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  // Add the delete() handler to the component class.
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
  // Although the component delegates hero deletion to the 
//   HeroService, it remains responsible for updating its own list of heroes. 
//   The component's delete() method immediately removes the hero-to-delete from 
//   that list, anticipating that the HeroService will succeed on the server.

// There's really nothing for the component to do with the Observable returned by 
// heroService.delete() but it must subscribe anyway.
// If you neglect to subscribe(), the service will not send the delete request to the 
// server. As a rule, an Observable does nothing until something subscribes.
}
