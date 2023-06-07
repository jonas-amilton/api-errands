import { v4 as createUuid2 } from "uuid";
import { Errands } from "./errands";

export class User {
  public id: string;
  private _errands: Errands[];
  constructor(private _name: string, private email: string) {
    this.id = createUuid2();
    this._errands = [];
  }
}
