import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Rent } from '../../models/rent.model';
import { RentService } from '../../services/rent.service';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';
import { PropertyTypeService } from '../../services/property-type.service';


@Component({
  standalone: true,
  selector: 'app-rent-dialog',
  templateUrl: './rent-dialog.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ]
})
export class RentDialogComponent {
  rentForm: FormGroup;
  isEdit = false;
  propertyTypes: any[] = [];
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  paymentModes: string[] = [
    'Cash', 'UPI', 'Bank Transfer', 'Cheque'
  ];
  startDate = new Date();

  constructor(
    private dialogRef: MatDialogRef<RentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rent,
    private fb: FormBuilder,
    private rentService: RentService,
    private readonly propertyTypeService: PropertyTypeService,
  ) {
    this.isEdit = !!data;

    this.rentForm = this.fb.group({
      paymentDate: [data?.paymentDate || '', Validators.required],
      renterName: [data?.renterName || '', Validators.required],
      phone: [data?.phone || '', [ Validators.minLength(10), Validators.maxLength(10)]],
      monthPaidFor: [data?.monthPaidFor || '', Validators.required],
      yearPaidFor: [data?.yearPaidFor || '', Validators.required],
      rentAmount: [data?.rentAmount, Validators.required],
      electricityCharges: [data?.electricityCharges],
      otherCharges: [data?.otherCharges],
      actualPaymentReceived: [data?.actualPaymentReceived, Validators.required],
      propertyType: [data?.propertyType || '', Validators.required],
      paymentMode: [data?.paymentMode || '', Validators.required],
      comments: [data?.comments || '']
    });
  }

  ngOnInit(): void {
    this.propertyTypeService.getAll().subscribe((types) => {
      this.propertyTypes = types;
    });
  }

  onSubmit(): void {
    const rent: Rent = this.rentForm.value;
    if (this.isEdit && this.data._id) {
      this.rentService.updateRent(this.data._id, rent).subscribe(() => this.dialogRef.close(true));
    } else {
      this.rentService.addRent({...rent}).subscribe(() => this.dialogRef.close(true));
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
