import {Component, EventEmitter, Output} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {ButtonComponent} from "../button/button.component";
import {TextFieldComponent} from "../text-field/text-field.component";

@Component({
  selector: "app-new-todo",
  standalone: true,
  imports: [
    FormsModule,
    ButtonComponent,
    TextFieldComponent
  ],
  templateUrl: "./new-todo.component.html",
  styleUrl: "./new-todo.component.css"
})
export class NewTodoComponent {
  label: string = "";
  @Output() onCreate = new EventEmitter<string>();

  public submitTodo(): boolean {
    const trimmed = this.label.trim();
    if (trimmed.length > 0) {
      this.onCreate.emit(trimmed);
      this.label = "";
      return true;
    }
    return false;
  }

  onEnter(event: Event) {
    if (this.submitTodo())
      (event.target as HTMLElement).blur();
  }
}
