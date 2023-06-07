import { v4 as createUuid2 } from "uuid";

export class User {
  public id: string;

  constructor(private _name: string, private email: string) {
    this.id = createUuid2();
  }
}
