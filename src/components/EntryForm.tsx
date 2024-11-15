import { useState, SyntheticEvent } from "react";
import patientService from "../services/patients";
import { EntryFormValues, HealthCheckRating, Diagnosis } from "../types";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText, SelectChangeEvent } from "@mui/material";
import Alert from '@mui/material/Alert';


interface EntryFormProps {
  id: string;
  diagnoses: Diagnosis[];
}

const EntryForm = ({ id, diagnoses }: EntryFormProps) => {
  const [entryType, setEntryType] = useState<"HealthCheck" | "OccupationalHealthcare" | "Hospital">("HealthCheck");
  const [formData, setFormData] = useState<Omit<EntryFormValues, 'type'>>({
    description: "",
    date: "",
    specialist: "",
    healthCheckRating: undefined,
    sickLeave: undefined,
    employerName: "",
    discharge: undefined,
    diagnosisCodes: [] as string[]
  });
  const [error, setError] = useState<string | null>(null);

  const handleEntryTypeChange = (event: SelectChangeEvent<"HealthCheck" | "OccupationalHealthcare" | "Hospital">) => {
    setEntryType(event.target.value as "HealthCheck" | "OccupationalHealthcare" | "Hospital");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleHealthCheckRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 3) {
      setFormData((prevData) => ({
        ...prevData,
        healthCheckRating: value as HealthCheckRating,
      }));
    }
  };

  const handleDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    setFormData({
      ...formData,
      diagnosisCodes: event.target.value as string[],
    });
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await patientService.addEntry({ ...formData, type: entryType }, id);

      setFormData({
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: undefined,
        sickLeave: undefined,
        employerName: "",
        discharge: undefined,
        diagnosisCodes: [],
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(`${error.message} Check Again`);
      } else {
        setError('An unexpected error occurred. Check Again');
      }

      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <h2>New {entryType} Entry</h2>
      <form onSubmit={handleSubmit}>

        {/* Entry Type Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Entry Type</InputLabel>
          <Select
            value={entryType}
            onChange={handleEntryTypeChange}
            label="Entry Type"
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Description</InputLabel>
          <TextField
            fullWidth
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            fullWidth
            name="date"
            label="Date"
            type="date"
            value={formData.date}
            InputLabelProps={{ shrink: true }}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            fullWidth
            name="specialist"
            label="Specialist"
            value={formData.specialist}
            onChange={handleInputChange}
          />
        </FormControl>

        {entryType === "HealthCheck" && (
          <FormControl fullWidth margin="normal">
            <TextField
              fullWidth
              name="healthCheckRating"
              label="Health Check Rating"
              type="number"
              value={formData.healthCheckRating ?? ""}
              onChange={handleHealthCheckRatingChange}
              inputProps={{ min: 0, max: 3 }}
            />
          </FormControl>
        )}

        {entryType === "OccupationalHealthcare" && (
          <>
            <FormControl fullWidth margin="normal">
              <TextField
                fullWidth
                name="employerName"
                label="Employer Name"
                value={formData.employerName}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                fullWidth
                name="sickLeaveStartDate"
                label="Sick Leave Start Date"
                type="date"
                value={formData.sickLeave?.startDate ?? ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sickLeave: {
                      ...(formData.sickLeave || { endDate: "" }), // Ensure endDate exists
                      startDate: e.target.value,
                    } as { startDate: string; endDate: string },
                  })
                }
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                fullWidth
                name="sickLeaveEndDate"
                label="Sick Leave End Date"
                type="date"
                value={formData.sickLeave?.endDate ?? ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sickLeave: {
                      ...(formData.sickLeave || { startDate: "" }), // Ensure startDate exists
                      endDate: e.target.value,
                    } as { startDate: string; endDate: string },
                  })
                }
              />
            </FormControl>
          </>
        )}

        {entryType === "Hospital" && (
          <>
            <FormControl fullWidth margin="normal">
              <TextField
                fullWidth
                name="dischargeDate"
                label="Discharge Date"
                type="date"
                value={formData.discharge?.date ?? ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discharge: {
                      ...(formData.discharge || { criteria: "" }), // Ensure criteria exists
                      date: e.target.value,
                    } as { date: string; criteria: string },
                  })
                }
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                fullWidth
                name="dischargeCriteria"
                label="Discharge Criteria"
                value={formData.discharge?.criteria ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discharge: {
                      ...(formData.discharge || { date: "" }), // Ensure date exists
                      criteria: e.target.value,
                    } as { date: string; criteria: string },
                  })
                }
              />
            </FormControl>
          </>
        )}

        <FormControl fullWidth margin="normal">
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={formData.diagnosisCodes}
            onChange={handleDiagnosisChange}
            renderValue={(selected) => (selected as string[]).join(", ")}
          >
            {diagnoses.map((diagnose) => (
              <MenuItem key={diagnose.code} value={diagnose.code}>
                <Checkbox checked={(formData.diagnosisCodes ?? []).includes(diagnose.code)} />
                <ListItemText primary={`${diagnose.code} - ${diagnose.name}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          ADD
        </Button>
      </form>
    </div>
  );
};

export default EntryForm;
