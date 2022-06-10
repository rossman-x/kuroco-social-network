import { Outlet } from "@remix-run/react";
import { useEffect, useState } from "react";
import AppHeader from "~/components/app-header";
import User from "~/declarations/user";
import { InfoContextProvider } from "~/hooks/useInfo";
import { getCurrentUserInfo } from "~/services/auth.service";
import styles from "~/styles/header.css";
import Spinner from "~/components/spinner";
import { redirect } from "@remix-run/node";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Index() {
  useEffect(() => {
    window.location.href = "/news";
  });
  return <div></div>;
}
