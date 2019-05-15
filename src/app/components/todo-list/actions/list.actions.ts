import { Action } from '@ngrx/store';
import { TodoListItem } from '../models';
import { TodoEntity } from '../reducers';

export const ITEM_COMPLETED  = '[todos] item completed';
export class CompletedItem implements Action {
  readonly type = ITEM_COMPLETED;
  item: TodoEntity;
  constructor(item: TodoListItem) {
    this.item = {
      id: item.id,
      description: item.description
    };
  }
}

let nextId = 0;

export const ITEM_ADDED = '[todos] item added';
export class AddedItem implements Action {
  readonly type = ITEM_ADDED;
  item: TodoEntity;
  constructor(description: string) {
    this.item = {
      id: 'T' + nextId++,
      description
    };
  }
}

export const ITEM_ADDED_SUCCESS = '[todos] item added success';
export class ItemAddedSuccessfully implements Action {
  readonly type = ITEM_ADDED_SUCCESS;
  constructor(public oldId: string, public item: TodoEntity) { }
}

export type All =
CompletedItem
| AddedItem
| ItemAddedSuccessfully;
