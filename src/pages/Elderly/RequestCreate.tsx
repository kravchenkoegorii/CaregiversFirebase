import { Create, useResourceContext } from "react-admin";
import { DataProviderResources } from "../../abstracts/enums";
import RequestFormInputs from "./RequestFormInputs";

const RequestCreate = () => {

  const resource = useResourceContext();

  return (
    <Create resource={DataProviderResources.REQUESTS} redirect={`/${resource}`}>
      <RequestFormInputs />
    </Create>
  );
};

export default RequestCreate;
