import express from "express";
import bodyParser from "body-parser";
import {
  setupDb,
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} from "./controllers/planets";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

setupDb();

app.get("/planets", getAll);
app.get("/planets/:id", getOneById);
app.post("/planets", create);
app.put("/planets/:id", updateById);
app.delete("/planets/:id", deleteById);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
