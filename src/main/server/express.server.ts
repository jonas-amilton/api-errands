import { createApp } from "../configs/express.config";
import express from "express";
import cors from "cors";

/**
 * Classe responsável por iniciar o servidor da API.
 * @class Server
 * @static
 * @function listen - Método para iniciar o servidor e escutar em uma porta específica.
 * @module Server
 * @author Jonas
 */
export class Server {
  /**
   * Inicia o servidor da API e escuta em uma porta específica.
   * @function listen
   * @static
   */
  public static listen() {
    const app = createApp();
    const port = process.env.PORT;

    app.listen(port, () => {
      console.log(`API is running on port ${port}`);
    });
  }

  public static create() {
    const app = express();
    app.use(express.json());


    app.use(
      cors({
        origin: "*",
      })
    );
  }
}
// Copyright [Jonas Silva]
