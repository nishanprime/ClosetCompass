import { createContext, useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { IAppContext, IUser } from "@/interfaces";
import { AuthService } from "@/services";
import Loader from "@/components/Loader";

export const AppContext = createContext({} as IAppContext);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within the AppProvider");
  }
  return context;
};

const AppProvider = (props: any) => {
  const [user, setUser] = useState<IUser | null>(null);

  const { isLoading, data, refetch } = useQuery("me", AuthService.me, {
    onSuccess: (data) => {
      setUser(data);
    },
    onError: () => {
      setUser(null);
    },
  });

  if (data && !user) {
    setUser(data);
  }

  const value = useMemo(
    () => ({
      isLoading,
      user,
      setUser,
      refetch,
    }),
    [isLoading, user]
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppProvider;
