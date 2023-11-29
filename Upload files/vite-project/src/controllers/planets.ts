import { Request, Response } from "express";
import pgPromise from "pg-promise";
const pgp = pgPromise();
const connectionString = "postgres://postgress:@localhost:5432/adk";
const db = pgp(connectionString);

export const setupDb = () => {
  db.none(
    "DROP TABLE IF EXISTS planets; CREATE TABLE planets(id SERIAL NOT NULL PRIMARY KEY, name TEXT NOT NULL);"
  )
    .then(() => {
      return db.none("INSERT INTO planets (name) VALUES ($1), ($2);", [
        "Earth",
        "Mars",
      ]);
    })
    .catch((error) => {
      console.error("Error setting up the database:", error);
    });

  return db;
};
export const getAll = async (_req: Request, res: Response) => {
  try {
    const planets = await db.any("SELECT * FROM planets;");
    res.json(planets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOneById = async (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id);

  try {
    const planet = await db.one(
      "SELECT * FROM planets WHERE id = $1;",
      planetId
    );
    res.json(planet);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Planet not found" });
  }
};

export const create = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    await db.none("INSERT INTO planets (name) VALUES ($1);", name);
    res.status(201).json({ msg: "Planet created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateById = async (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id);
  const { name } = req.body;

  try {
    await db.none("UPDATE planets SET name=$2 WHERE id=$1;", [planetId, name]);
    res.json({ msg: "Planet updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id);

  try {
    await db.none("DELETE FROM planets WHERE id=$1;", planetId);
    res.json({ msg: "Planet deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id);
  const imagePath = req.file?.path;

  try {
    await db.none("UPDATE planets SET image=$2 WHERE id=$1;", [
      planetId,
      imagePath,
    ]);
    res.json({ msg: "Image uploaded and linked to the planet" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
