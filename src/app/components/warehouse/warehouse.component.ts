import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { ActivatedRoute } from '@angular/router';
import * as uuid from 'uuid';
import { Warehouse } from 'src/app/dto';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  @Input() warehouse: Warehouse = {
    id: undefined,
    uuid: '',
    client: '',
    family: '',
    size: 0
  };

  constructor(
    private warehouseService: WarehouseService,
    private location: Location,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.isNew()) {
      this.warehouse.uuid = this.getUUID();
    } else if (this.willDelete()){
      this.deleteWarehouse();
    }else {
      this.getWarehouse();
    }
  }

  goBack(): void {
    this.location.back();
  }

  getWarehouse(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';

    this.warehouseService.getById(id)
        .subscribe({
          complete: () => {},
          next: (val) => {
            this.warehouse = val;
          },
          error: (err) => {}
        });
  }

  canEdit(): boolean {
    return this.route.snapshot.queryParamMap.has('edit') === false;
  }

  isNew(): boolean {
    return this.route.snapshot.queryParamMap.has('new');
  }

  willDelete(): boolean {
    return this.route.snapshot.queryParamMap.has('delete');
  }


  getUUID(): string {
    return uuid.v4();
  }

  saveWarehouse(newWarehouse: Warehouse): void {
    this.messageService.add(JSON.stringify(newWarehouse));
    this.warehouseService.save(newWarehouse)
      .subscribe({
        complete: () => {
          this.goBack();
        },
        next: (val) => {},
        error: (err) => {}
      });
  }

  deleteWarehouse(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';

    this.warehouseService.delete(id)
      .subscribe({
        complete: () => {
          this.goBack();
        },
        next: (val) => {},
        error: (err) => {
          this.goBack();
        }
      });
  }

  getWarehouseFamilyList(): string[] {
    return Object.values(Warehouse.Family).map(e => e.toString()).filter(e => isNaN(e as any));
  }

  updateWarehouse(newWarehouse: Warehouse): void {
    this.messageService.add(JSON.stringify(newWarehouse));
    this.warehouseService.update(newWarehouse)
      .subscribe({
        complete: () => {
          this.goBack();
        },
        next: (val) => {},
        error: (err) => {}
      });
  }
}
