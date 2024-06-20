import {Component, OnInit} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import {Todo, TodosService} from "./todos.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Observable, NEVER, Subject, Subscription} from "rxjs";
import {TodoComponent} from "./todo/todo.component";
import {NewTodoComponent} from "./new-todo/new-todo.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NgIf, AsyncPipe, TodoComponent, NgForOf, NewTodoComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent implements OnInit {
  //todos$: Observable<Todo[]> = NEVER;
  todos = new Subject<Todo[]>();
  todosSubscription: Subscription;
  loading: boolean = true;
  cachedTodos: Todo[] = [];

  constructor(private todosService: TodosService) {
    this.todosSubscription = this.todos.subscribe(todos => {
      this.loading = false;
      this.cachedTodos = todos
    });
  }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todosService.getTodos()
      .subscribe(todos => this.todos.next(todos));
  }

  submitTodo(label: string) {
    this.todosService.createTodo(label)
      .subscribe(() => this.loadTodos());
  }

  checkTodo(id: number, checked: boolean) {
    this.todosService.updateTodo(id, {checked})
      .subscribe(() => this.loadTodos());
  }

  renameTodo(id: number, label: string) {
    this.todosService.updateTodo(id, {label})
      .subscribe(() => this.loadTodos());
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id)
      .subscribe(() => this.loadTodos());
  }

  todoIdentify(index: number, todo: Todo) {
    return todo.id;
  }
}
