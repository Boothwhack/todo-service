import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent {
  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  toggleChecked() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
