import { createContext, useContext, useEffect, useState } from "react";
import User from "~/declarations/user";
import { getCurrentUserInfo } from "~/services/auth.service";

const infoContext = createContext<User | null>(null);

export const InfoContextProvider = ({
  children,
  user,
}: {
  children: JSX.Element;
  user: User | null;
}) => {
  return <infoContext.Provider value={user}>{children}</infoContext.Provider>;
};
const useInfo = () => {
  const info = useContext(infoContext);
  return info;
};

export default useInfo;
