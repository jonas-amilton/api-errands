import { v4 as createUuid } from "uuid";



export class ErrandModel  {
  title: string;
  description: string;
  userId: string;
  id: string;

  constructor(title: string, description: string, userId: string, id?:string) {
      this.title = title;
      this.description = description;
      this.userId = userId;
      this.id = id ?? createUuid();
    }

    static create(
      title: string,
      description: string,
      userId: string,
      id?: string,
    ) {
      return new ErrandModel(title, description, userId, id);
    }
  
    toJsonE() {
      return {
        title: this.title,
        description: this.description,
        userId: this.userId,
        id: this.id,
      };
    }
}
