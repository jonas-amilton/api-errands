import { v4 as createUuid } from "uuid";

export enum TypeErrand {
  Archived = "A",
  Public = "P",
}

export class ErrandModel  {
  title: string;
  description: string;
  userId: string;
  id: string;
  type: TypeErrand;

  constructor(title: string, description: string, userId: string, id?:string, type?: TypeErrand) {
      this.title = title;
      this.description = description;
      this.userId = userId;
      this.id = id ?? createUuid();
      this.type = type ?? TypeErrand.Public
    }

    static create(
      title: string,
      description: string,
      userId: string,
      id?: string,
      type?: TypeErrand,
    ) {
      return new ErrandModel(title, description, userId, id, type);
    }
  
    toJsonE() {
      return {
        title: this.title,
        description: this.description,
        userId: this.userId,
        id: this.id,
        type: this.type
      };
    }
}
