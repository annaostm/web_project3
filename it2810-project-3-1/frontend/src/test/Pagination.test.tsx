import { MouseEvent } from "react";
import { unmountComponentAtNode } from "react-dom";
import renderer from "react-test-renderer";
import Pagination from "../components/pagination/Pagination";

// setup a DOM element as a render target
let container: Element | DocumentFragment | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

// cleanup on exiting
afterEach(() => {
  // cleanup on exiting
  if (container == null) {
    throw "container is null";
  }
  unmountComponentAtNode(container);
  container = null;
});

//Test for Pagination
it("Test for Pagination", () => {
  const tree = renderer
    .create(
      <Pagination
        count={2}
        page={1}
        rowsPerPage={10}
        onPageChange={(
          event: MouseEvent<HTMLButtonElement>,
          page: number
        ) => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
