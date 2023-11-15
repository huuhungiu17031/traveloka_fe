import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { JsonFormData } from '../../components/form/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  formData!: JsonFormData;
  constructor(private httpClient: HttpClient) {
  
  }
}
