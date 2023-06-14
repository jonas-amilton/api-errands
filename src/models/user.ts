import { v4 as createUuid2 } from "uuid";
import { Errands } from "./errands";

export class User {
  public id: string;
  private _errands: Errands[];
  constructor(
    private _name: string,
    private _email: string,
    private _password: string
  ) {
    this.id = createUuid2();
    this._errands = [];
  }

  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get errands(): Errands[] {
    return this._errands;
  }

  public set name(name: string) {
    this._name = name;
  }

  public set email(email: string) {
    this._email = email;
  }

  public set password(password: string) {
    this._password = password;
  }

  public toJson() {
    return {
      id: this.id,
      name: this._name,
    };
  }
}
