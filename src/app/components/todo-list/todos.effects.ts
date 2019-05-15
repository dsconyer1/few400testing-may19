import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { TodosDataService } from './todos.data.service';
import * as actions from './actions/list.actions';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class TodosEffects {

    @Effect() itemAdded$ = this.actions$
        .pipe(
            ofType(actions.ITEM_ADDED),
            map(a => a as actions.AddedItem),
            switchMap(a => this.service.addTodo(a.item.description)
              .pipe(
                map(result => new actions.ItemAddedSuccessfully(a.item.id, result))
              )
            )
        );

        constructor(private actions$: Actions, private service: TodosDataService) {}
}
