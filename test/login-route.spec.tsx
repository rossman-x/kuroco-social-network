import { RenderResult } from "@testing-library/react";
import LoginComponent from "~/routes/login";
import { RenderWithoutProviders } from "./mocks";
import "@testing-library/jest-dom";
describe("Given Login Page is opened", () => {
  let render: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement
  >;
  describe("When user is not authenticated", () => {
    beforeEach(() => {
      jest.resetAllMocks();
      render = RenderWithoutProviders(<LoginComponent />);
    });
    it("Then render correctly", () => {
      expect(render.asFragment()).toBeTruthy();
      expect(render.getByTestId("login-page-main")).toBeInTheDocument();
    });
    it("Then login form is displayed correctly", () => {
      const { getByTestId } = render;
      const loginForm = getByTestId("login-form");
      expect(loginForm).toBeDefined();
      expect(loginForm).toBeInTheDocument();

      const emailInput = getByTestId("email-input");
      expect(loginForm).toContainElement(emailInput);
      expect(emailInput.tagName).toBe("INPUT");

      const passInput = getByTestId("password-input");
      expect(loginForm).toContainElement(passInput);
      expect(passInput.tagName).toBe("INPUT");
    });
  });
});
