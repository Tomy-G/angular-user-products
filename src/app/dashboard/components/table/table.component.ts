import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface ProductData {
  _id: string;
  name: string;
  color: string;
  price: string;
  units: string;
  company: string;
  shippedFrom: string;
  owner: string;
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-table',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'color', 'units','company', 'shipped', 'owner', ];
  dataSource: MatTableDataSource<ProductData> = new MatTableDataSource();
  username : string | null = sessionStorage.getItem('user');

  nameFilter = new FormControl('');
  idFilter = new FormControl('');
  colorFilter = new FormControl('');
  priceFilter = new FormControl('');
  unitsFilter = new FormControl('');
  companyFilter = new FormControl('');
  shippedFilter = new FormControl('');
  ownerFilter = new FormControl('');

  products: ProductData[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterValues = {
    name: '',
    _id: '',
    color: '',
    price: '',
    units: '',
    company: '',
    shippedFrom: '',
    owner: '',
  };

  constructor(private http: HttpClient, private router: Router) {
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.getProducts().subscribe((products) => {
      if(this.username != null){
        this.products = products;
        this.products = this.userFilter(products);
        this.dataSource.data = this.products;
        this.dataSource.filterPredicate = this.createFilter();
      }
      
    });
    // this.dataSource = new MatTableDataSource(this.users);
  }
  getProducts(): Observable<ProductData[]> {
    return this.http.get<ProductData[]>('http://localhost:3000/products');
  }

  ngOnInit() {
    this.nameFilter.valueChanges.subscribe((name) => {
      this.filterValues.name = name;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.idFilter.valueChanges.subscribe((_id) => {
      this.filterValues._id = _id;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.colorFilter.valueChanges.subscribe((color) => {
      this.filterValues.color = color;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.priceFilter.valueChanges.subscribe((price) => {
      this.filterValues.price = price;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.unitsFilter.valueChanges.subscribe((units) => {
      this.filterValues.units = units;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.companyFilter.valueChanges.subscribe((company) => {
      this.filterValues.company = company;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.shippedFilter.valueChanges.subscribe((shipped) => {
      this.filterValues.shippedFrom = shipped;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.ownerFilter.valueChanges.subscribe((owner) => {
      this.filterValues.owner = owner;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  userFilter(lista : ProductData[]){
    return this.products.filter(product => {
      return product.owner === this.username
  })}


  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (
      data: {
        name: string;
        _id: string;
        color: string;
        price: string;
        units: string;   
        company: string;
        shippedFrom: string;
        owner: string;

      },
      filter: string
    ): boolean {
      let searchTerms = JSON.parse(filter);
      console.log(data)
      return (
        data.name.toLowerCase().indexOf(searchTerms.name) !== -1 &&
        data.units.toString().toLowerCase().indexOf(searchTerms.units) !== -1 &&
        data._id.toLowerCase().indexOf(searchTerms._id) !== -1 &&
        data.color.toLowerCase().indexOf(searchTerms.color) !== -1 &&
        data.price.toLowerCase().indexOf(searchTerms.price) !== -1 &&
        data.company.toLowerCase().indexOf(searchTerms.company) !== -1 &&
        data.shippedFrom.toLowerCase().indexOf(searchTerms.shippedFrom) !== -1 &&
        data.owner.toLowerCase().indexOf(searchTerms.owner) !== -1
      );
    };
    return filterFunction;
  }
}
