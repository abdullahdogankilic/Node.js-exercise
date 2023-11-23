import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import "express-async-errors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

app.get("/planets", (req, res) => {
  res.json(planets);
});

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
