import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
export interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  nullValidator?: boolean;
}

export interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}

export interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  validators: JsonFormValidators;
  required?: boolean;
  options?: JsonFormControlOptions;
}

export interface JsonFormData {
  controls: JsonFormControls[];
}
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnChanges {
  @Input({ required: true }) jsonFormData!: JsonFormData;
  @Output() sendFormValue = new EventEmitter<any>();
  @Input({ required: true }) formName!: string;
  public myForm: FormGroup = this.formBuilder.group({});
  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['jsonFormData'].firstChange) {
      this.createForm(this.jsonFormData.controls);
    }
  }

  createForm(controls: JsonFormControls[]) {
    for (const control of controls) {
      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'emailTrue':
            value && validatorsToAdd.push(Validators.email);
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'required':
            value && validatorsToAdd.push(Validators.required);
            break;
          default:
            break;
        }
      }
      this.myForm.addControl(
        control.name,
        this.formBuilder.control(control.value, validatorsToAdd)
      );
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.sendFormValue.emit(this.myForm.value);
    }
  }
}
