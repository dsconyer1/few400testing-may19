import * as fromTodos from "./components/todo-list/reducers";
export interface State {
  todos: fromTodos.State;
}

export const reducers = {
  todos: fromTodos.reducer
}
