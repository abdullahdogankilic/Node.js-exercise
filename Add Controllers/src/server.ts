import express from "express";
import * as planetsController from "./controllers/planets";

const app = express.Router();

app.get("/api/planets", planetsController.getAll);

app.get("/api/planets/:id", planetsController.getOneById);

app.post("/api/planets", planetsController.create);

app.put("/api/planets/:id", planetsController.updateById);

app.delete("/api/planets/:id", planetsController.deleteById);

export default app;
