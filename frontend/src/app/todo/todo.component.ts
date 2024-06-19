import {Component, Input} from "@angular/core";
import {Todo} from "../todos.service";

@Component({
  selector: "app-todo",
  standalone: true,
  imports: [],
  templateUrl: "./todo.component.html",
  styleUrl: "./todo.component.css"
})
export class TodoComponent {
  @Input() todo!: Todo;
}
