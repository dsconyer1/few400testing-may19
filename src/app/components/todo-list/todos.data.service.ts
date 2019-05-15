import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TodoEntity } from "./reducers";
import { map } from "rxjs/operators";

@Injectable()
export class TodosDataService {

  constructor(private client: HttpClient) { }

  addTodo(description: string) {
    return this.client.post<TodoEntity>('http://localhost:3000/todos', { description });
  }
}
