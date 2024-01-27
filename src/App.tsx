import { LoadScript } from "@react-google-maps/api";
import React from "react";
import "./App.css";
import { Admin, Resource } from "react-admin";
import { BrowserRouter } from "react-router-dom";
import { googleApiKey, libraries } from "./constants";
import { firebaseAuthProvider, firebaseDataProvider } from "./middleware";
import { ResourcesNames, UserRole } from "./abstracts/enums";
import AuthPage from "./pages/Auth/AuthPage";
import RequestList from "./pages/Caregiver/RequestList";
import RequestsMapShow from "./pages/Caregiver/RequestsMap";
import CurrentRequestList from "./pages/Elderly/CurrentRequestList";
import PreviousRequestList from "./pages/Elderly/PreviousRequestList";
import RequestCreate from "./pages/Elderly/RequestCreate";
import RequestShow from "./pages/Elderly/RequestShow";

export const App = () => {
  return (
    <BrowserRouter>
      <LoadScript
        googleMapsApiKey={googleApiKey}
        libraries={libraries}
      >
        <Admin
          requireAuth
          loginPage={AuthPage}
          dataProvider={firebaseDataProvider}
          authProvider={firebaseAuthProvider}
        >
          {permissions => {
            return (
              <>
                {permissions === UserRole.Elderly &&
                  <>
                    <Resource
                      name={ResourcesNames.CURRENT_REQUESTS}
                      create={RequestCreate}
                      show={RequestShow}
                      list={CurrentRequestList}
                    />
                    <Resource
                      name={ResourcesNames.PREVIOUS_REQUESTS}
                      show={RequestShow}
                      list={PreviousRequestList}
                    />
                  </>
                }
                {permissions === UserRole.Caregiver &&
                  <>
                    <Resource
                      name={ResourcesNames.AVAILABLE_REQUESTS}
                      list={RequestsMapShow}
                    />

                    <Resource
                      name={ResourcesNames.APPLIED_REQUESTS}
                      list={RequestList}
                      show={RequestShow}
                    />
                  </>
                }
              </>
            );
          }}
        </Admin>
      </LoadScript>
    </BrowserRouter>
  );
};

export default App;
