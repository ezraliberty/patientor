export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

interface Data {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type Patient = Omit<Data, "ssn">;
