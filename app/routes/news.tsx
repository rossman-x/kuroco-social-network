import { Outlet } from "@remix-run/react";
import { useState, useEffect } from "react";
import AppHeader from "~/components/app-header";
import Spinner from "~/components/spinner";
import User from "~/declarations/user";
import { InfoContextProvider } from "~/hooks/useInfo";
import { getCurrentUserInfo } from "~/services/auth.service";
import styles from "~/styles/header.css";
import postStyles from "~/styles/post.css";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};
const NewsComponent = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const user = await getCurrentUserInfo();
        setUserInfo(user);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);
  return userInfo ? (
    <InfoContextProvider user={userInfo}>
      <div>
        <AppHeader />
        <Outlet />
      </div>
    </InfoContextProvider>
  ) : (
    <Spinner />
  );
};

export default NewsComponent;
