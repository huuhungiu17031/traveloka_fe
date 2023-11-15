import { Component, inject, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-date-picker-range',
  templateUrl: './date-picker-range.component.html',
  styleUrls: ['./date-picker-range.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class DatePickerRangeComponent implements OnInit {
  checkInFormControl = new FormControl(new Date(), [Validators.required]);
  checkOutFormControl = new FormControl('', [Validators.required]);
  parentContainer = inject(ControlContainer);

  ngOnInit(): void {
    this.parentFormGroup.addControl('checkIn', this.checkInFormControl);
    this.parentFormGroup.addControl('checkOut', this.checkOutFormControl);
  }

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
}
