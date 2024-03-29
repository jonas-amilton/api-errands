import { ErrandModel } from "./index";
import { v4 as createUuid } from "uuid";

export class UserModel {
  public id: string;
  private _errands: ErrandModel[];

  constructor(
    private _name: string,
    private _email: string,
    private _password: string
  ) {
    this.id = createUuid();
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

  public get errand(): ErrandModel[] {
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
      email: this._email,
      password: this._password,
      errands: this._errands,
    };
  }

  static create(name: string, email: string, password: string, id?: string) {
    return new UserModel(name, email, password);
  }
}
