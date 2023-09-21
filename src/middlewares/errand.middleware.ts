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
    return ApiResponse.notProvided(res, "Description");
  }

  if (!type) {
    return ApiResponse.notProvided(res, "Tipo");
  }

  if (type !== "A" && type !== "P") {
    return ApiResponse.notFound(
      res,
      "Tipo de recado invalido! (Arquivado ou Publico)"
    );
  }

  next();
};
