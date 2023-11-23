import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

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

const validatePlanetFields = [
  body("id").isInt().withMessage("id must be an integer"),
  body("name").isString().withMessage("name must be a string"),
  (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

router.get("/api/planets", (req: Request, res: Response) => {
  res.json(planets);
});

router.get("/api/planets/:id", (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id);
  const planet = planets.find((p) => p.id === planetId);

  if (planet) {
    res.json(planet);
  } else {
    res.status(404).json({ error: "Planet not found" });
  }
});

router.post(
  "/api/planets",
  validatePlanetFields,
  (req: Request, res: Response) => {
    const newPlanet = req.body;
    planets.push(newPlanet);
    res.status(201).json({ msg: "Planet created successfully" });
  }
);

router.put(
  "/api/planets/:id",
  validatePlanetFields,
  (req: Request, res: Response) => {
    const planetId = parseInt(req.params.id);
    const updatedPlanet = req.body;

    const index = planets.findIndex((p) => p.id === planetId);

    if (index !== -1) {
      planets[index] = updatedPlanet;
      res.json({ msg: "Planet updated successfully" });
    } else {
      res.status(404).json({ error: "Planet not found" });
    }
  }
);

router.delete("/api/planets/:id", (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id);

  const index = planets.findIndex((p) => p.id === planetId);

  if (index !== -1) {
    planets.splice(index, 1);
    res.json({ msg: "Planet deleted successfully" });
  } else {
    res.status(404).json({ error: "Planet not found" });
  }
});

export default router;
