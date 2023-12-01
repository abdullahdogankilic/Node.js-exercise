import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import {
  setupDb,
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  uploadImage,
} from "./controllers/planets";
import authorize from "./authorize";
import { logIn, singUp, logOut } from "./controllers/users";
import "./passport";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (_req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
setupDb();

app.get("/planets", getAll);
app.get("/planets/:id", getOneById);
app.post("/planets", create);
app.put("/planets/:id", updateById);
app.delete("/planets/:id", deleteById);
app.post("/planets/:id/image", upload.single("image"), uploadImage);
app.post("users/login", logIn);
app.post("users/signup", singUp);
app.get("users/logout", authorize, logOut);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
