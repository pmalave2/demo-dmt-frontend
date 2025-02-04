import { Component, OnInit } from '@angular/core';
import { Warehouse } from '../dto';
import { WarehouseService } from '../services/warehouse.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

const ELEMENT_DATA_2: Warehouse[] = [
  {id: '0', uuid: 'aa-aa-aa', client: 'ACME', family: Warehouse.Family[Warehouse.Family.EST], size: 1000},
  {id: '1', uuid: 'aa-aa-ab', client: 'ACME2', family: Warehouse.Family[Warehouse.Family.ROB], size: 100},
];

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'uuid', 'client', 'family', 'size', 'actions'];
  dataSource: Warehouse[] = [];

  constructor(private warehouseService: WarehouseService) {}

  ngOnInit(): void {
    this.getDataSource();
  }

  getDataSource(): void {
    this.warehouseService.get()
        .subscribe(warehouse => this.dataSource = warehouse);
  }

}
