import { Component, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { RentDialogComponent } from '../rent-dialog/rent-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Rent } from '../../models/rent.model';
import { RentService } from '../../services/rent.service';
import { ExcelExportService } from '../../services/excel-export.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    DatePipe
  ]
})
export class RentListComponent {
  displayedColumns: string[] = ['paymentDate', 'renterName', 'phone','monthPaidFor', 'yearPaidFor','rentAmount','actualPaymentReceived', 'electricityCharges', 'otherCharges', 'propertyType', 'paymentMode', 'comments', 'createdBy','actions'];
  dataSource = new MatTableDataSource<Rent>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  totalRent = 0;
  rents: Rent[] = [];
  isMobileView = false;

  constructor(private dialog: MatDialog, private rentService: RentService, private excelExportService : ExcelExportService) {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize.bind(this));
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth <= 768; // Adjust the breakpoint as needed
  }

  ngOnInit() {
    this.loadRents();
  }

  loadRents(): void {
    this.rentService.getAllRents().subscribe(rents => {
      this.dataSource.data = rents;
      this.rents = rents;
      this.totalRent = rents.reduce((sum, r) => sum + r.actualPaymentReceived, 0);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  downloadExcel() {
    const allRents = [...this.rents];

    const filteredRents = allRents.map(rent => ({
      'Payment Date': new Date(rent.paymentDate).toLocaleDateString(),
      'Renter Name': rent.renterName,
      'Phone': rent.phone,
      'Month Paid For': rent.monthPaidFor,
      'Year Paid For': rent.yearPaidFor,
      'Rent Amount': rent.rentAmount,
      'Actual Payment Received': rent.actualPaymentReceived,
      'Electricity Charges': rent.electricityCharges,
      'Other Charges': rent.otherCharges,
      'Property Type': rent.propertyType,
      'Payment Mode': rent.paymentMode,
      'Comments': rent.comments,
    }))
    this.excelExportService.exportAsExcel( filteredRents, 'rents_' + new Date().toISOString().slice(0, 10));
  }


  addRent() {
    this.dialog.open(RentDialogComponent, {
      width: '500px'
    }).afterClosed().subscribe(result => {
      if (result) this.loadRents();
    });
  }

  editRent(rent: Rent) {
    this.dialog.open(RentDialogComponent, {
      width: '500px',
      data: rent
    }).afterClosed().subscribe(result => {
      if (result) this.loadRents();
    });
  }

  deleteRent(rent: any): void {
    if (confirm('Are you sure you want to delete this rent?')) {
      this.rentService.deleteRent(rent._id).subscribe(() => this.loadRents());
    }
  }
}
