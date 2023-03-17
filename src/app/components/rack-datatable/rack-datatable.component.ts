import { Component, Input, OnInit } from '@angular/core';
import { Rack, Warehouse } from 'src/app/dto';
import { RackService } from 'src/app/services/rack.service';

@Component({
  selector: 'app-rack-datatable',
  templateUrl: './rack-datatable.component.html',
  styleUrls: ['./rack-datatable.component.css']
})
export class RackDatatableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'uuid', 'type', 'actions'];
  dataSource: Rack[] = [];
  @Input() warehouse: Warehouse | undefined;

  constructor(private rackService: RackService) {}

  ngOnInit(): void {
    this.getDataSource();
  }

  getDataSource(): void {
    this.rackService.get()
        .subscribe(racks => this.dataSource = this.filterByWarehouse(racks));
  }

  filterByWarehouse(racks: Rack[]): Rack[]{
    return racks.filter(e => e.warehouseId === this.warehouse!.id);
  }
}
