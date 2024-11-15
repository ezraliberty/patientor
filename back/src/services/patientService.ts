import patients from "../../data/patients";
import { NewPatientEntry, NonSensitivePatientEntry, Patient, NewEntriesEntry, Entry } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient => {
  const patient = patients.find(patient => patient.id === id)!;

  const filteredEntries = patient.entries.filter(
    (entry) => entry.type === "HealthCheck" || entry.type === "OccupationalHealthcare" || entry.type === "Hospital"
  );

  return {
    ...patient,
    entries: filteredEntries,
  };
};

const newPatient = (entry: NewPatientEntry): NonSensitivePatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    entries: [],
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};


const newEntry = (entry: NewEntriesEntry, patientId: string): Entry => {
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getPatient,
  getPatients,
  newPatient,
  newEntry
};
