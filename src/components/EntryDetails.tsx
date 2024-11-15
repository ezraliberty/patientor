import {  Entry } from "../types";
import HospitalEntryPage from "./HospitalEntryPage";
import OccupationalEntry from "./OccupationalEntry";
import HealthEntry from "./HealthEntry";

const assertNever = (value: never): never => {
    throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const EntryDetails = ({entry}: {entry: Entry}) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntryPage entry={entry}/>;
        case "OccupationalHealthcare":
            return <OccupationalEntry entry={entry}/>;
        case "HealthCheck":
            return <HealthEntry entry={entry} />; 
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;