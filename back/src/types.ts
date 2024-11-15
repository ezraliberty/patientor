// types.ts
import { z } from "zod";
import { NewPatientSchema, HealthCheckEntrySchema, OccupationalHealthcareEntrySchema, HospitalEntrySchema, NewEntriesSchema } from "./utils";

export type Diagnosis = {
  code: string;
  name?: string;
  latin?: string;
};

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient extends NewPatientEntry {
  id: string;
  entries: Entry[];
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
export type HealthCheckEntryType = z.infer<typeof HealthCheckEntrySchema>;
export type OccupationalHealthcareEntryType = z.infer<typeof OccupationalHealthcareEntrySchema>;
export type HospitalEntryType = z.infer<typeof HospitalEntrySchema>;
export type NewEntriesEntry = z.infer<typeof NewEntriesSchema>;

interface HealthCheckEntry extends HealthCheckEntryType {
  type: "HealthCheck";
}

interface OccupationalHealthcareEntry extends OccupationalHealthcareEntryType {
  type: "OccupationalHealthcare";
}

interface HospitalEntry extends HospitalEntryType {
  type: "Hospital";
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export type NonSensitivePatientEntry = Omit<Patient, "ssn" | "entries">;
export type NonSensitiveDiagnosisEntry = Omit<Diagnosis, "name" | "latin">;






// import { z } from "zod";
// import { NewEntriesSchema, NewPatientSchema } from "./utils";

// export type Diagnosis = {
//   code: string;
//   name?: string;
//   latin?: string;
// };

// export enum Gender {
//   Male = "male",
//   Female = "female",
//   Other = "other",
// }

// export interface Patient extends NewPatientEntry {
//   id: string;
//   entries: Entry[]
// }

// interface BaseEntry {
//   id: string;
//   description: string;
//   date: string;
//   specialist: string;
//   diagnosisCodes?: Array<Diagnosis['code']>;
// }

// export enum HealthCheckRating {
//   "Healthy" = 0,
//   "LowRisk" = 1,
//   "HighRisk" = 2,
//   "CriticalRisk" = 3
// }

// interface HospitalDischarge {
//   date: string,
//   criteria: string,
// }

// interface OccupationLeave {
//   startDate: string,
//   endDate: string
// } 

// interface HealthCheckEntry extends NewEntriesEntry {
//   type: "HealthCheck";
//   healthCheckRating: HealthCheckRating;
// }

// interface OccupationalHealthcareEntry extends NewEntriesEntry{
//   type: "OccupationalHealthcare"
//   sickLeave: OccupationLeave
//   employerName: string
// }

// interface HospitalEntry extends NewEntriesEntry {
//   type: "Hospital"
//   discharge: HospitalDischarge
// }

// export type Entry =
//   | HospitalEntry
//   | OccupationalHealthcareEntry
//   | HealthCheckEntry;

// export type NonSensitivePatientEntry = Omit<Patient, "ssn" | 'entries'>;

// export type NonSensitiveDiagnosisEntry = Omit<Diagnosis, "name" | 'latin'>;

// export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

// export type NewEntriesEntry = z.infer<typeof NewEntriesSchema>;