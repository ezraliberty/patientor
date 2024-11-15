import { HospitalEntry } from "../types";

const HospitalEntryPage = ({ entry }: { entry: HospitalEntry }) => {
    return (
        <div>
            <p>{entry.date}</p>
            <p>{entry.description}</p>
            <p>Diagnose by {entry.specialist}</p>
            {entry.discharge && (<p>Discharged on: {entry.discharge.date}, Reason: {entry.discharge.criteria} </p>)}
        </div>
    );

};

export default HospitalEntryPage;