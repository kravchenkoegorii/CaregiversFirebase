import { Libraries } from "@react-google-maps/api";

export const googleApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

export const libraries: Libraries = ["places", "geocoding"];
