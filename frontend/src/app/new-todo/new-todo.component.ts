import {Component, EventEmitter, Output} from "@angular/core";
import {FormsModule} from "@angular/forms";

@Component({
  selector: "app-new-todo",
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: "./new-todo.component.html",
  styleUrl: "./new-todo.component.css"
})
export class NewTodoComponent {
  label: string = "";
  @Output() onCreate = new EventEmitter<string>();

  public submitTodo() {
    const trimmed = this.label.trim();
    if (trimmed.length > 0)
    {
      this.onCreate.emit(trimmed);
      this.label = "";
    }
  }
}
