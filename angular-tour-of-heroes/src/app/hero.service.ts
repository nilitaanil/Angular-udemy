// You refactored data access to the HeroService class.

import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'; 
// In HeroService, import the MessageService.
// In the HeroService, import HttpClient and HttpHeaders:
import { HttpClient, HttpHeaders } from '@angular/common/http';

//To catch errors, you "pipe" the observable result from http.get() 
// through an RxJS catchError() operator.
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
  // You registered the HeroService as the provider of its service at 
  // the root level so that it can be injected anywhere in the app.
})
export class HeroService {
    // Define the heroesUrl of the form :base/:collectionName with the address of the heroes
  //  resource on the server. Here base is the resource to which requests are made, and 
  // collectionName is the heroes data object in the in-memory-data-service.ts.
  private heroesUrl = 'api/heroes';  // URL to web api


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Modify the constructor with a parameter that declares a private messageService property. 
  // Angular will inject the singleton MessageService into that property when it creates 
  // the HeroService.
  constructor(
    // Still in the HeroService, inject HttpClient into the constructor 
    // in a private property called http.
    private http: HttpClient,
    private messageService: MessageService) { }

  // getHeroes(): Hero[] {
  //   return HEROES;
  // }
  // getHeroes(): Observable<Hero[]> {
  //   return of(HEROES); 
  //   // of(HEROES) returns an Observable<Hero[]> that emits a single value, 
  //   // the array of mock heroes.
  // }
  // you'll call HttpClient.get<Hero[]>() which also returns an Observable<Hero[]> 
  // that emits a single value, an array of heroes from the body of the HTTP response.


  // Modify the getHeroes() method to send a message when the heroes are fetched.
  // getHeroes(): Observable<Hero[]> {
  //   // TODO: send the message _after_ fetching the heroes
  //   this.messageService.add('HeroService: fetched heroes');
  //   return of(HEROES); 
  //}
    // You used RxJS of() to return an observable of mock heroes (Observable<Hero[]>).

    // The current HeroService.getHeroes() uses the RxJS of() function to return an 
    // array of mock heroes as an Observable<Hero[]>.
    // Convert that method to use HttpClient as follows:
    /** GET heroes from the server */
    // getHeroes(): Observable<Hero[]> {
      //return this.http.get<Hero[]>(this.heroesUrl);
    //   return this.http.get<Hero[]>(this.heroesUrl)
    // .pipe(catchError(this.handleError<Hero[]>('getHeroes', [])));
      // extend the observable result with the pipe() method and 
      // give it a catchError() operator.
    // }

// Here is the final version of getHeroes() with the tap() that logs the operation.
    /** GET heroes from the server */
getHeroes(): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
}
    //     The hero data should successfully load from the mock server.
    // You've swapped of() for http.get() and the app keeps working without any other 
    // changes because both functions return an Observable<Hero[]>.

  // Like getHeroes(), getHero() has an asynchronous signature.
  //  It returns a mock hero as an Observable, using the RxJS of() function.
  // You'll be able to re-implement getHero() as a real Http request without 
  // having to change the HeroDetailComponent that calls it.

  // getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    // backticks ( ` ) that define a JavaScript template literal for embedding the id.
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

  /** GET hero by id. Will 404 if id not found */
getHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}


// he overall structure of the updateHero() method is
//  similar to that of getHeroes(), but it uses http.put() to persist the 
// changed hero on the server. Add the following to the HeroService.
/** PUT: update the hero on the server */
updateHero(hero: Hero): Observable<any> {
  return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}


  // Notice that you keep injecting the MessageService but since you'll call it so
  //  frequently, wrap it in a private log() method:
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
    // addHero() differs from updateHero() in two ways:

    // It calls HttpClient.post() instead of put().
    // It expects the server to generate an id for the new hero, which it 
    // returns in the Observable<Hero> to the caller.
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );

  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }


}


