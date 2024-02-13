import { useEffect } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Redirect = ({
  to,
  redirect,
  error,
}: {
  to: string;
  redirect?: string | string[];
  error?: string;
}) => {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams();
  if (error) {
    searchParams.append("error", error);
  }

  useEffect(() => {
    if (redirect) {
      //set url to local storage
      localStorage.setItem("redirect_url", redirect as string);
    }

    if (to?.includes("http")) {
      return window.location.replace(to);
    }

    navigate(
      {
        pathname: to,
        search: searchParams.toString(),
      },
      {
        replace: true,
      }
    );
  }, [to]);

  return (
    <Flex
      w="full"
      h="100vh"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="brand.primary"
        size="xl"
      />
    </Flex>
  );
};

export default Redirect;
