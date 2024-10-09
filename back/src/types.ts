import { z } from "zod";
import { NewPatientSchema } from "./utils";

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Data extends NewPatientEntry {
  id: string;
}

export type Patient = Omit<Data, "ssn">;

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
