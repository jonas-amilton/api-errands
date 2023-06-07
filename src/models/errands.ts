import { v4 as createUuid2 } from "uuid";

export class Errands {
  public id: string;

  constructor(private _title: string, private _description: string) {
    this.id = createUuid2();
  }
}
