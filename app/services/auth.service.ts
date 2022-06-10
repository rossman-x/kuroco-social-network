import User from "~/declarations/user";
import { HostUrl } from "~/R";
import { userConverter } from "./converter";
import { getData, postData } from "./fetch";

export const getGrantToken = async (email: string, password: string) => {
  const result = await postData(
    `${HostUrl}/login`,
    {
      email,
      password,
    },
    false
  );
  return result;
};

export const generateToken = async (grantToken: string) => {
  const result = await postData(
    `${HostUrl}/token`,
    {
      grant_token: grantToken,
    },
    false
  );
  return result;
};

export const getCurrentUserInfo = async (): Promise<User> => {
  const result = await getData(`${HostUrl}/me`);
  if (!result || !result.details) throw new Error("Cannot fetch data.");
  return userConverter(result.details);
};
