import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.css'
})
export class TextFieldComponent {
  @Input() stealth: boolean = false;
  @Input() value: string = "";
  @Input() placeholder: string = "";
  @Output() valueChange = new EventEmitter<string>();

  get inputValue() {
    return this.value;
  }

  set inputValue(value) {
    this.value = value;
    this.valueChange.emit(value);
  }
}
