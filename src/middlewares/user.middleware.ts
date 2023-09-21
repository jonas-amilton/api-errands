import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../util/http-response.adapter";

export const userCheck = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name) {
    return ApiResponse.notProvided(res, "Nome");
  }

  if (!email) {
    return ApiResponse.notProvided(res, "Email");
  }

  // todo: validar corretamente
  if (!password) {
    return ApiResponse.notProvided(res, "Senha");
  }

  next();
};
