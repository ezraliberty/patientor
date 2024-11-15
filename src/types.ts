export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HospitalDischarge {
  date: string,
  criteria: string,
}

interface OccupationLeave {
  startDate: string,
  endDate: string
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  sickLeave: OccupationLeave
  employerName: string
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital"
  discharge: HospitalDischarge
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface EntryFormValues {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
  healthCheckRating?: HealthCheckRating;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
  employerName?: string;
  discharge?: {
    date: string;
    criteria: string;
  };
  type: "HealthCheck" | "OccupationalHealthcare" | "Hospital";
}


export type PatientFormValues = Omit<Patient, "id" | "entries">;