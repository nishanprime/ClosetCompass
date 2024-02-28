import { useSearchParams } from "react-router-dom";

import Alert from "components/Alert";

const ErrorsMessage = () => {
  const [searchParams] = useSearchParams();

  const error = searchParams.get("error");

  if (error) {
    return <Alert status="error">{error}</Alert>;
  }

  return null;
};

export default ErrorsMessage;
