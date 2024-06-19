import {Component, OnInit} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import {Todo, TodosService} from "./todos.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Observable, NEVER} from "rxjs";
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
  todos$: Observable<Todo[]> = NEVER;

  constructor(private todosService: TodosService) {
  }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todos$ = this.todosService.getTodos();
  }

  submitTodo(label: string) {
    this.todosService.createTodo(label)
      .subscribe(() => this.loadTodos());
  }
}
