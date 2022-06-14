import { fireEvent, render, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom";
import AlertComponent from "app/components/alert-component";

describe("Alert Component", () => {
  const title = "Some title here";
  const content = "With a content that can be modified";
  const mockedFunction = jest.fn();

  beforeEach(() => {});
  it("should render the title", () => {
    const { getByText } = render(
      <AlertComponent title={title} content={content} action={mockedFunction} />
    );
    expect(getByText(title)).toBeDefined();
    expect(getByText(title)).toBeInTheDocument();
  });
  it("should render the content", () => {
    const { getByText } = render(
      <AlertComponent title={title} content={content} action={mockedFunction} />
    );
    expect(getByText(content)).toBeDefined();
    expect(getByText(content)).toBeInTheDocument();
  })
  it("should perform the action when the button is clicked.", () => {
    const { getByText, asFragment } = render(
      <AlertComponent title={title} content={content} action={mockedFunction} />
    );
    expect(getByText("Close")).toBeDefined();
    expect(getByText("Close")).toBeInTheDocument();
    const firstRender = asFragment();
    fireEvent.click(getByText("Close"));
    expect(firstRender).toMatchSnapshot(asFragment());
    expect(mockedFunction).toHaveBeenCalled();
    
  });
});
