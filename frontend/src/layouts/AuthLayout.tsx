import { Flex, Spinner } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import AuthHeader from "components/Layout/AuthHeader";
import { useAppContext } from "contexts/AppProvider"
import Redirect from "components/Redirect";

const AuthLayout = () => {
  const { user, isLoading } = useAppContext();

  if (isLoading) {
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
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  if (user) {
    const redirect_url = localStorage.getItem("redirect_url");

    if (!redirect_url) {
      return <Redirect to="/" />;
    }

    window.location.replace(redirect_url);

    //remove redirect url from local storage
    localStorage.removeItem("redirect_url");

    return null;
  }

  return (
    <Flex w="full" h="100vh" flexDirection="column" overflowY="hidden">
      <AuthHeader />
      <Flex
        w="full"
        pt={["60px", "60px", "80px"]}
        h="100vh"
        flexDirection="column"
        overflow="auto"
      >
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default AuthLayout;
