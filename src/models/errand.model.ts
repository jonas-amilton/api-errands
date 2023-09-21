import { v4 as createUuid } from "uuid";

export enum TypeErrand {
  Archived = "A",
  Public = "P",
}

export class ErrandModel {
  public _id: string;

  constructor(
    private _title: string,
    private _description: string,
    private _type: TypeErrand
  ) {
    this._id = createUuid();  }

  public get title(): string {
    return this._title;
  }

  public get description(): string {
    return this._description;
  }

  public get type(): TypeErrand {
    return this._type;
  }

  public set title(title: string) {
    this._title = title;
  }

  public set description(description: string) {
    this._description = description;
  }

  public set type(type: TypeErrand) {
    this._type = type;
  }

  public toJsonE() {
    return {
      title: this._title,
      description: this._description,
      type: this._type,
    };
  }
}
