import cors from "cors";
import express, { Request, Response } from "express";
import { errandRoutes } from "../../app/features/errand/routes/errand.routes";
import { userRoutes } from "../../app/features/user/routes/user.routes";

/**
 * Criação e configuração da aplicação Express.
 * @function createApp
 * @returns {express.Application} - Instância da aplicação Express configurada.
 * @author Jonas Silva
 */
export const createApp = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
  
    app.get("/", (req: Request, res: Response) =>
      res.status(200).json({ ok: true, message: "API ERRANDS" })
    );
  
    // ROUTES
    app.use("/users", userRoutes());
    app.use(errandRoutes());
  
    return app;
};

// Copyright [Jonas Silva]