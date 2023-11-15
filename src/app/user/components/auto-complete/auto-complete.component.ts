import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { debounceTime } from 'rxjs';

export interface PayloadFormElement {
  controlName: string;
  value: any;
}

export interface Location {
  id: number;
  name: string;
}

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class AutoCompleteComponent {
  @Input() options: Location[] = [];
  @Input({ required: true }) controlName: string = '';
  @Input({ required: true }) label: string = '';
  @Output() sendInputValue = new EventEmitter<any>();
  parentContainer = inject(ControlContainer);
  myControl = new FormControl('', [Validators.required]);
  ngOnInit() {
    this.parentFormGroup.addControl(this.controlName, this.myControl);
    this.myControl.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.sendInputValue.emit(value);
    });
  }

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  handleSelectionChange(event: MatOptionSelectionChange) {
    this.myControl.setValue(event.source.value?.name);
  }
}
