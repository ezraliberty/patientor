import { OccupationalHealthcareEntry } from "../types";
import WorkIcon from '@mui/icons-material/Work';

const OccupationalEntry = ({entry}: {entry: OccupationalHealthcareEntry}) => {
    return (
        <div>
        <p>{entry.date} <WorkIcon/> {entry.employerName}</p>
        <p>{entry.description}</p>
        <p>Diagnosed by {entry.specialist}</p>
        {entry.sickLeave && (
            <p>Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
        )}
        </div>
    );
};

export default OccupationalEntry;