import express, { Request, Response, NextFunction } from "express";
import patientService from "../services/patientService";
import { z } from "zod";
import { NewPatientSchema, NewEntriesSchema } from "../utils";
import { NewPatientEntry, NonSensitivePatientEntry, NewEntriesEntry } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntriesParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntriesSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post(
  "/:id/entries", 
  newEntriesParser, 
  (req: Request<{ id: string }, unknown, NewEntriesEntry>, res: Response) => {
    const patientId = req.params.id;
    const entryData = req.body;
    const addedEntry = patientService.newEntry(entryData, patientId);

    res.json(addedEntry);
});

router.post(
  "/",
  newEntryParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<NonSensitivePatientEntry>) => {
    const addedPatient = patientService.newPatient(req.body);
    res.json(addedPatient);
  },
);

router.get("/:id", (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.use(errorHandler);

export default router;
