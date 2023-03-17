export interface Warehouse {
  id?: string;
  uuid: string;
  client: string;
  family: string;
  size: number;
}

export namespace Warehouse{
  export enum Family {
    EST, ROB
  }
}