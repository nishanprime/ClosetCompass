import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import PortalHeader from "components/Layout/PortalHeader";
//import Redirect from "components/Redirect";
//import PortalSidebar from "components/Layout/PortalSidebar";
import { useAppContext } from "contexts";
import Redirect from "../components/Redirect";

const Layout = () => {
  const { user } = useAppContext();

  if (!user) {
    return <Redirect to="/auth/login" />;
  }

  return (
    <Flex
      w="full"
      h="100vh"
      flexDirection="column"
      overflowY="hidden"
      bg="brand.portalBackground"
    >
      <PortalHeader />
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
};

const PortalLayout = () => {
  return (
    // TODO: Here should be our OutfitProvider
    // <OutfitProvider>
    <Layout />
    // </OutfitProvider>
  );
};

export default PortalLayout;
