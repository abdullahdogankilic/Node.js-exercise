import { Request, Response } from "express";

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

export const getAll = (req: Request, res: Response): void => {
  res.json(planets);
};

export const getOneById = (req: Request, res: Response): void => {
  const planetId = parseInt(req.params.id);
  const planet = planets.find((p) => p.id === planetId);

  if (planet) {
    res.json(planet);
  } else {
    res.status(404).json({ error: "Planet not found" });
  }
};

export const create = (req: Request, res: Response): void => {
  const newPlanet = req.body;
  planets = [...planets, newPlanet];
  res.status(201).json({ msg: "Planet created successfully" });
};

export const updateById = (req: Request, res: Response): void => {
  const planetId = parseInt(req.params.id);
  const updatedPlanet = req.body;

  planets = planets.map((p) => (p.id === planetId ? updatedPlanet : p));

  res.json({ msg: "Planet updated successfully" });
};

export const deleteById = (req: Request, res: Response): void => {
  const planetId = parseInt(req.params.id);

  planets = planets.filter((p) => p.id !== planetId);

  res.json({ msg: "Planet deleted successfully" });
};
