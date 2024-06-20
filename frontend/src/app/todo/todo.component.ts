import {Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from "@angular/core";
import {Todo} from "../todos.service";
import {CheckboxComponent} from "../checkbox/checkbox.component";
import {ButtonComponent} from "../button/button.component";
import {TextFieldComponent} from "../text-field/text-field.component";
import {debounceTime, Subject, Subscription} from "rxjs";

@Component({
  selector: "app-todo",
  standalone: true,
  imports: [
    CheckboxComponent,
    ButtonComponent,
    TextFieldComponent
  ],
  templateUrl: "./todo.component.html",
  styleUrl: "./todo.component.css"
})
export class TodoComponent implements OnDestroy {
  @Input() todo!: Todo;
  protected readonly window = window;
  @ViewChild('container', {static: false}) container!: ElementRef<HTMLDivElement>;

  rawChecked = new Subject<boolean>();
  checkedDebounceSubscription: Subscription;

  rawLabel = new Subject<string>();
  labelDebounceSubscription: Subscription;

  @Output() deleted = new EventEmitter();
  @Output() renamed = new EventEmitter<string>();
  @Output() checked = new EventEmitter<boolean>();

  constructor() {
    this.checkedDebounceSubscription = this.rawChecked
      .pipe(debounceTime(500))
      .subscribe(checked => this.checked.emit(checked));
    this.labelDebounceSubscription = this.rawLabel
      .pipe(debounceTime(500))
      .subscribe(label => this.renamed.emit(label));
  }

  defocus(event: Event) {
    (event.target as HTMLElement).blur();
  }

  deleteTodo() {
    const element = this.container.nativeElement;
    element.classList.add("todo__container--deleted");
    setTimeout(() => this.deleted.emit(), 200);
  }

  setChecked(checked: boolean) {
    this.todo.checked = checked;
    this.rawChecked.next(checked);
  }

  setLabel(label: string) {
    this.todo.label = label;
    this.rawLabel.next(label);
  }

  ngOnDestroy(): void {
    this.checkedDebounceSubscription.unsubscribe();
  }
}
