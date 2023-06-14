import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../util/http-response.adapter";

export const errandCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, type } = req.body;
  if (!title) {
    return ApiResponse.notProvided(res, "Titulo");
  }

  if (!description) {
    return ApiResponse.notProvided(res, "Descrição");
  }

  if (!type) {
    return ApiResponse.notProvided(res, "Tipo");
  }

  if (type !== "Public" && type !== "Archived") {
    return ApiResponse.notFound(
      res,
      "Tipo de valor está invalido (Public ou Archived)"
    );
  }

  next();
};
