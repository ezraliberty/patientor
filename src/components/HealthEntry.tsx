import { HealthCheckEntry, HealthCheckRating } from "../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthEntry = ({entry}: {entry: HealthCheckEntry}) => {
    const healthCheck = (rating: HealthCheckRating) => {
        switch (rating) {
            case HealthCheckRating.Healthy:
                return "success";
            case HealthCheckRating.LowRisk:
                return "yellow";
            case HealthCheckRating.HighRisk:
                return "orange";
            case HealthCheckRating.CriticalRisk:
                return "red";
            default:
                return "disabled";
        }
    };


    return (
        <div>
            <p>{entry.date} <MedicalServicesIcon /> </p>
            <p>{entry.description}</p>
            <p>Diagnose by {entry.specialist}</p>
            <p><FavoriteIcon color={healthCheck(entry.healthCheckRating)} /></p>
        </div>
    );

};

export default HealthEntry;