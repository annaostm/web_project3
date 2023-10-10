import { MouseEvent } from "react";
import { unmountComponentAtNode } from "react-dom";
import renderer from "react-test-renderer";
import FilterButton from "../components/filterButton/FilterButton";

// setup a DOM element as a render target
let container: Element | DocumentFragment | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

// cleanup on exiting
afterEach(() => {
  if (container == null) {
    throw "container is null";
  }
  unmountComponentAtNode(container);
  container = null;
});

//Test for Filterbutton
it("Test for FilterButton", () => {
  const tree = renderer
    .create(
      <FilterButton options={["Comedies", "Crime", "Horror"]} name={"Filter"} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
