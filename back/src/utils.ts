import { Gender, HealthCheckRating, NewPatientEntry } from "./types";
import { z } from "zod";

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  ssn: z.string(),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientSchema.parse(object);
};

const DiagnosisCodeSchema = z.string();

const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(DiagnosisCodeSchema).optional(),
});

const HealthCheckRatingSchema = z.nativeEnum(HealthCheckRating);

const HospitalDischargeSchema = z.object({
  date: z.string(),
  criteria: z.string(),
});

export const OccupationLeaveSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: HealthCheckRatingSchema,
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  sickLeave: OccupationLeaveSchema.optional(),
  employerName: z.string(),
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: HospitalDischargeSchema,
});

export const NewEntriesSchema = z.union([
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);









// import { Gender, NewPatientEntry, HealthCheckRating } from "./types";
// import { z } from "zod";

// export const NewPatientSchema = z.object({
//   name: z.string(),
//   dateOfBirth: z.string().date(),
//   gender: z.nativeEnum(Gender),
//   occupation: z.string(),
//   ssn: z.string(),
// });

// export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
//   return NewPatientSchema.parse(object);
// };

// const DiagnosisCodeSchema = z.string(); 

// const BaseEntrySchema = z.object({
//   id: z.string(),
//   description: z.string(),
//   date: z.string(),
//   specialist: z.string(),
//   diagnosisCodes: z.array(DiagnosisCodeSchema).optional(),
// });

// const HealthCheckRatingSchema = z.nativeEnum(HealthCheckRating);

// const HospitalDischargeSchema = z.object({
//   date: z.string(),
//   criteria: z.string(),
// });

// const OccupationLeaveSchema = z.object({
//   startDate: z.string(),
//   endDate: z.string(),
// });

// const HealthCheckEntrySchema = BaseEntrySchema.extend({
//   type: z.literal("HealthCheck"),
//   healthCheckRating: HealthCheckRatingSchema,
// });

// const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
//   type: z.literal("OccupationalHealthcare"),
//   sickLeave: OccupationLeaveSchema,
//   employerName: z.string(),
// });

// const HospitalEntrySchema = BaseEntrySchema.extend({
//   type: z.literal("Hospital"),
//   discharge: HospitalDischargeSchema,
// });

// export const NewEntriesSchema = z.union([
//   HealthCheckEntrySchema,
//   OccupationalHealthcareEntrySchema,
//   HospitalEntrySchema,
// ]);