import express, { Request, Response, NextFunction } from "express";
import patientService from "../services/patientService";
import { z } from "zod";
import { NewPatientSchema } from "../utils";
import { Patient, NewPatientEntry } from "../types";

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

router.post(
  "/",
  newEntryParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatient = patientService.newPatient(req.body);
    res.json(addedPatient);
  },
);

router.use(errorHandler);

export default router;
