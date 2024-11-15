import axios, { AxiosError } from "axios";
import { Patient, PatientFormValues, Entry, EntryFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (object: EntryFormValues, id: string): Promise<Entry> => {
  try {
    const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, object);
    return data;
  } catch (e) {
    const error = e as AxiosError; 
    const errorMessage = error.response?.data?.error?.[0] || 'An error occurred';
    return Promise.reject(errorMessage);
  }
};


export default {
  getAll, create, getPatient, addEntry
};

