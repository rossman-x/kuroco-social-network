import AppHeader from "app/components/app-header";
import {
  mockUserOne,
  RenderWithoutProviders,
  RenderWithProviders,
} from "./mocks";
import { RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom";
// import avatarImage from "~/assets/avatar.png";

import avatarHeader2 from "~/components/app-header";
console.log(avatarHeader2);

describe("Given app Header component is open", () => {
  let render: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement
  >;
  describe("When user is authenticated", () => {
    describe("When user have a complete profile", () => {
      beforeEach(() => {
        jest.resetAllMocks();
        render = RenderWithProviders(<AppHeader />);
      });
      it("Then render correctly", () => {
        expect(render.asFragment()).toBeTruthy();
        expect(render.getByTestId("app-header-main")).toBeInTheDocument();
      });
      it("Then display texts correctly", () => {
        const { getByText } = render;
        expect(getByText(`Member`)).toBeInTheDocument();
        expect(
          getByText(`${mockUserOne.firstName} ${mockUserOne.lastName}`)
        ).toBeInTheDocument();
      });
    });
    describe("When User have an avatar", () => {
      beforeEach(() => {
        jest.resetAllMocks();
        render = RenderWithProviders(<AppHeader />);
      });
      it("Then display the avatar icon correctly", () => {
        const { getByAltText } = render;
        const imageElement = getByAltText(`Avatar image`);
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).not.toHaveAccessibleDescription();
        expect(imageElement).toHaveAttribute("src", `${mockUserOne.avatar}`);
      });
    });
    describe("When user does not have an avatar", () => {
      beforeEach(() => {
        jest.resetAllMocks();
        render = RenderWithProviders(<AppHeader />, {
          ...mockUserOne,
          avatar: undefined,
        });
      });
      it("Then display the default avatar icon correctly", () => {
        const { getByAltText } = render;
        const imageElement = getByAltText(`Avatar image`);
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).not.toHaveAccessibleDescription();
        // expect(imageElement).toHaveAttribute("src", `${avatarImage}`);
      });
    });
  });
  describe("When user is not authenticated", () => {
    beforeEach(() => {
      jest.resetAllMocks();
      render = RenderWithoutProviders(<AppHeader />);
    });
    it("Then render correctly", () => {
      expect(render.asFragment()).toBeTruthy();
    });
    it("Then render <AlertComponent />", () => {
      const { getByTestId } = render;
      expect(getByTestId("alert-component")).toBeInTheDocument();
    });
    it("Then header component is not rendered", () => {
      const { queryByTestId } = render;
      expect(queryByTestId("app-header-main")).not.toBeInTheDocument();
    });
  });
});
