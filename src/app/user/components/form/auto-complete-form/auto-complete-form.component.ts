import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-auto-complete-form',
  templateUrl: './auto-complete-form.component.html',
  styleUrls: ['./auto-complete-form.component.css'],
})
export class AutoCompleteFormComponent {
  filteredOptions!: Observable<string[]>;
  options: string[] = ['One', 'Two', 'Three'];

  ngOnInit() {
    this.filteredOptions = of(this.options);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
