import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-sort',
  templateUrl: './list-sort.component.html',
  styleUrls: ['./list-sort.component.css'],
})
export class ListSortComponent {
  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      facilities: this.fb.array([]),
    });
  }

  get getFacilities() {
    return this.form.get('facilities') as FormArray;
  }
}
