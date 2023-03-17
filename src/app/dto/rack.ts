export interface Rack {
  id?: string;
  uuid: string;
  type?: string;
  warehouseId: string;
}

export namespace Rack{
  export enum Type {
    A, B, C, D
  }
}