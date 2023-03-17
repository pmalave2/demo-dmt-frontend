import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RackComponent } from './components/rack/rack.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { DatatableComponent } from './datatable/datatable.component';

const routes: Routes = [
  { path: '', redirectTo: '/datatable', pathMatch: 'full' },
  { path: 'datatable', component: DatatableComponent },
  { path: 'warehouse/:id', component: WarehouseComponent },
  { path: 'warehouse', component: WarehouseComponent },
  { path: 'rack', component: RackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
