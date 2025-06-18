import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PropertyTypeService } from '../../services/property-type.service';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-property-type',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './property-type.component.html',
  styleUrl: './property-type.component.scss'
})
export class PropertyTypeComponent {
  propertyTypes: any[] = [];
  form: FormGroup;
  editMode = false;
  selectedId: string | null = null;

  constructor(private propertyTypeService: PropertyTypeService, private fb: FormBuilder) {
    this.form = this.fb.group({ name: [''] });
  }

  ngOnInit(): void {
    this.loadTypes();
  }

  loadTypes() {
    this.propertyTypeService.getAll().subscribe(data => {
      this.propertyTypes = data;
    });
  }

  submit() {
    const name = this.form.value.name;
    if (this.editMode && this.selectedId) {
      this.propertyTypeService.update(this.selectedId, name).subscribe(() => {
        this.resetForm();
        this.loadTypes();
      });
    } else {
      this.propertyTypeService.add(name).subscribe(() => {
        this.resetForm();
        this.loadTypes();
      });
    }
  }

  edit(type: any) {
    this.form.setValue({ name: type.name });
    this.editMode = true;
    this.selectedId = type._id;
  }

  delete(id: string) {
    if (confirm('Delete this property type?')) {
      this.propertyTypeService.delete(id).subscribe(() => {
        this.loadTypes();
      });
    }
  }

  resetForm() {
    this.form.reset();
    this.editMode = false;
    this.selectedId = null;
  }
}
