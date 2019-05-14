import { first } from 'rxjs/operators';
import { add, getFavoriteForeignFilm, returnsAnObservable } from './misc';

describe('a synchronous call', () => {
  it('can add two numbers together', () => {
    const answer = add(2, 3);
    expect(answer).toBe(5);
  });
});

describe('promises', () => {
  it('can be tricky', (done) => {
    const result = getFavoriteForeignFilm();
    console.log(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    result.then(a => {
      expect(a).toBe('Harakiri');
      done();  // have to call function for test to know when it is over
    });
  });

  it('using await', async () => {
    const result = await getFavoriteForeignFilm();
    expect(result).toBe('Harakiri');
  });
});

describe('using promises', () => {
  it('using the done thing', (done) => {
    returnsAnObservable().subscribe(r => {
      expect(r).toBe('Eggs');
      done();
    });
  });

  it('using async await', async () => {
    const meal = await returnsAnObservable().pipe(
      first()
    ).toPromise();
  });
});
