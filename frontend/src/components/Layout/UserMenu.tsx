import {
  Avatar,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

import { useAppContext } from "@/contexts";
import { AuthService } from "@/services";

const UserMenu = () => {
  const { user } = useAppContext();

  const onLogout = async () => {
    const response = await AuthService.logout();

    if (response) {
      window.location.href = "/auth/login";
    }
  };

  return (
    <Menu>
      <MenuButton display={["none", "none", "flex"]}>
        <Avatar
          size="sm"
          name={`${user?.first_name} ${user?.last_name}`}
          bg="brand.primary"
        />
      </MenuButton>

      <MenuList p={2} alignItems="center">
        <Flex align="center">
          <Avatar
            size="sm"
            name={`${user?.first_name} ${user?.last_name}`}
            bg="brand.primary"
          />
          <Flex flexDirection="column" ml="3">
            <Text fontWeight="bold">{`${user?.first_name} ${user?.last_name}`}</Text>
            <Text fontSize="sm">{user?.email}</Text>
            <Text fontSize={"sm"}>{user?.username}</Text>
          </Flex>
        </Flex>
        <Divider my={2} />
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
