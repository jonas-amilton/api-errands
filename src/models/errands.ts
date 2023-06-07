import { v4 as createUuid2 } from "uuid";

export enum TypeErrands {
  Public = "P",
  Archived = "A",
}

export class Errands {
  public id: string;

  constructor(
    private _title: string,
    private _description: string,
    private _type: TypeErrands
  ) {
    this.id = createUuid2();
  }
}
