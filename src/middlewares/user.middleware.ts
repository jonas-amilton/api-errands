import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../util/http-response.adapter";

export const userCheck = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name) {
    return ApiResponse.notFound(res, "Nome");
  }

  if (!email) {
    return ApiResponse.notFound(res, "Email");
  }

  if (!password) {
    return ApiResponse.notProvided(res, "Senha");
  }
  next();
};
