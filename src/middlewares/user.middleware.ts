import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../util/http-response.adapter";

export const userCheck = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email) {
    return ApiResponse.notFound(res, "Email");
  }

  if (!password) {
    return ApiResponse.notProvided(res, "Senha");
  }
  next();
};
