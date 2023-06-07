import { v4 as createUuid2 } from "uuid";
import { Errands } from "./errands";

export class User {
  public id: string;
  private _errands: Errands[];
  constructor(private _name: string, private _email: string) {
    this.id = createUuid2();
    this._errands = [];
  }

  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }

  public get errands(): Errands[] {
    return this._errands;
  }
}
