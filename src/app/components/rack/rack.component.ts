import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rack } from 'src/app/dto';
import { MessageService } from 'src/app/services/message.service';
import { RackService } from 'src/app/services/rack.service';
import * as uuid from 'uuid';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.css']
})
export class RackComponent implements OnInit {

  @Input() rack!: Rack;

  warehouseId: string | null = null;

  warehouseFamily: string | undefined;

  constructor(
    private rackService: RackService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.has('warehouseId'))
      this.warehouseId = this.route.snapshot.queryParamMap.get('warehouseId');

    if (this.route.snapshot.queryParamMap.has('warehouseFamily'))
      this.warehouseFamily = this.route.snapshot.queryParamMap.get('warehouseFamily') || '';

    this.rack = {
      uuid: uuid.v4(), 
      warehouseId: this.warehouseId!
    };
  }
  getRackTypeList(): string[] {
    if ('EST' === this.warehouseFamily){
      return ['A', 'B', 'C']
    }

    if ('ROB' === this.warehouseFamily){
      return ['A', 'B', 'D'];
    }

    return [];
  }

  goBack(): void {
    this.location.back();
  }

  saveRack(newRack: Rack): void {
    this.messageService.add(JSON.stringify(newRack));
    this.rackService.save(newRack)
      .subscribe({
        complete: () => {
          this.goBack();
        },
        next: (val) => {},
        error: (err) => {}
      });
  }


}
