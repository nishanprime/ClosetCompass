import { useEffect } from "react";
import { AuthService } from "services";

const Logout = () => {
  const onLogout = async () => {
    const response = await AuthService.logout();

    if (response) {
      window.location.href = "/auth/login";
    }
  };

  useEffect(() => {
    onLogout();
  }, []);

  return null;
};

export default Logout;
