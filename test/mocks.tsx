import { render } from "@testing-library/react";
import User from "~/declarations/user";
import { InfoContextProvider } from "~/hooks/useInfo";

export const mockUserOne: User = {
  id: "A",
  memberId: 1,
  firstName: "first",
  lastName: "member",
  email: "mock@mock.com",
  createdAt: "2020-01-01",
  nickname: "nickoname",
  address: "5 Avenue des Champs-Elysees",
  phone: "+33602726262",
  hireDate: "2020-01-01",
  office: "Tokyo",
  avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
};

export const RenderWithProviders = (
  children: JSX.Element,
  user = mockUserOne
) => render(<InfoContextProvider user={user}>{children}</InfoContextProvider>);

export const RenderWithoutProviders = (children: JSX.Element) =>
  render(children);
