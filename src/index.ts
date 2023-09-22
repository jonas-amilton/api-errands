import "reflect-metadata";
import { Database, CacheDatabase } from "./main/database/index";
import { Server } from "./main/server/express.server";


// Aguarda a resolução de todas as promessas (conexões com bancos) antes de iniciar o servidor
Promise.all([Database.connect(), CacheDatabase.connect()]).then(() => {
    Server.listen();
    console.log("Server is running.");
});


// Copyright [Jonas Silva]