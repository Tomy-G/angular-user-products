import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, MatTableModule, AppRoutingModule, MatFormFieldModule, MatPaginatorModule,MatInputModule, MatSortModule, ReactiveFormsModule ],
  exports: [TableComponent],
})
export class DashboardModule {}
