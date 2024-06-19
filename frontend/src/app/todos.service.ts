import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, map} from "rxjs";

export interface Todo {
  label: string;
  checked: boolean;
}

interface GetTodosResponse {
  todos: Todo[];
}

type PostTodoResponse = Todo;

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  constructor(private http: HttpClient) {
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<GetTodosResponse>("/api/todos")
      .pipe(
        map(response => response.todos)
      )
  }

  createTodo(label: string): Observable<Todo> {
    return this.http.post<PostTodoResponse>("/api/todos", {label});
  }
}
