import { useEffect, useState } from "react";
import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses";
import { useParams } from "react-router-dom";
import { Patient, Entry, Diagnosis } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetails from "./EntryDetails";
import EntryForm from "./EntryForm";

const PatientPage = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        const fetchPatient = async () => {
            const patient = await patientService.getPatient(id);
            setPatient(patient);
        };

        const fetchDiagnoses = async () => {
            const diagnoses = await diagnosesService.getDiagnoses();
            setDiagnoses(diagnoses);
        };

        void fetchPatient();
        void fetchDiagnoses();
    }, [id]);


    if (!patient) {
        return <div>Loading...</div>;
    }

    const getDiagnosesName = (code: string): string => {
        return diagnoses.find(diagnoses => diagnoses.code === code)?.name;
    };

    let gender;

    if (patient.gender === "male") {
        gender = <MaleIcon />;
    } else if (patient.gender === "female") {
        gender = <FemaleIcon />;
    } else {
        gender = <TransgenderIcon />;
    }

    return (
        <div>
            <h2>{patient.name} {gender}</h2>
            <p>SSN: {patient.ssn}</p>
            <p>OCCUPATION: {patient.occupation}</p>

            <EntryForm id={id} diagnoses={diagnoses} />

            <h3>Entries</h3>
            {patient.entries.map((entry: Entry) => (
                <EntryDetails key={entry.id} entry={entry} />
            ))}
        </div>
    );
};

export default PatientPage;