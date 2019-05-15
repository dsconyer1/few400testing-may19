
import { ReplaySubject, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { TodosEffects } from './todos.effects';
import { TodosDataService } from './todos.data.service';
import { TodoEntity } from './reducers';
import { provideMockActions } from "@ngrx/effects/testing";
import * as listActions from './actions/list.actions';

class FakeDataService extends TodosDataService {
  constructor() {
    super(null);
  }

  addTodo(description: string) {
    const response: TodoEntity = { description, id: '42' };
    return of(response);
  }
}


describe('the todos effect', () => {
  let effect: TodosEffects;
  let actions: ReplaySubject<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosEffects,
        { provide: TodosDataService, useClass: FakeDataService },
        provideMockActions(() => actions)
      ]
    });

    effect = TestBed.get(TodosEffects);
  });

  it('turns an ITEM_ADDED into ITEM_ADDED_SUCCESSFULLY', () => {
    actions = new ReplaySubject(1);
    const action = new listActions.AddedItem('Tacos');
    actions.next(action);

    effect.itemAdded$.subscribe(result => {
      const expected: listActions.ItemAddedSuccessfully = {
        type: listActions.ITEM_ADDED_SUCCESS,
        oldId: action.item.id,
        item: {
          description: 'Tacos',
          id: '42'

        }
      };

      // expect(result).toEqual(expected);
      expect(result.oldId).toBe(expected.oldId);
      expect(result.type).toBe(expected.type);
      expect(result.item.description).toBe(expected.item.description);
      expect(result.item.id).toBe(expected.item.id);
    });
  });
});
