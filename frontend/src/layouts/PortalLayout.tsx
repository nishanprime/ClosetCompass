import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

// import { AppealProvider, useAppContext } from "contexts";
import PortalHeader from "components/Layout/PortalHeader";
import Redirect from "components/Redirect";
import PortalSidebar from "components/Layout/PortalSidebar";

const Layout = () => {
  // TODO: setup context with user
  //   const { user } = useAppContext();
  const user = true;
  if (user) {
    return (
      <Flex
        w="full"
        h="100vh"
        flexDirection="column"
        overflowY="hidden"
        bg="brand.portalBackground"
      >
        <PortalHeader />
        <PortalSidebar />
        <Flex
          w="full"
          h="100vh"
          flexDirection="column"
          overflow="auto"
          pt={["60px", "60px", "70px"]}
        >
          <Flex
            flexDirection="column"
            py={["7", "7", "10"]}
            px={["5", "10", "10"]}
            pb={["80px", "80px", "40px"]}
            ml={[0, 0, "80px"]}
            minH={["auto", "auto", "full"]}
          >
            <Outlet />
          </Flex>
        </Flex>
      </Flex>
    );
  }

  return (
    <Redirect
      to="/auth/login"
      redirect={window.location.href}
      error="You must be logged in to view this page. Please log in or create an account."
    />
  );
};

const PortalLayout = () => {
  return (
    // TODO: setup context/provider AppealProvider
    // TODO: and wrap the layout with it
    // <AppealProvider>
    <Layout />
    // </AppealProvider>
  );
};

export default PortalLayout;
