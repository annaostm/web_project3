import { HashRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { unmountComponentAtNode } from "react-dom";
import Navbar from "../components/navbar/Navbar";

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

//Test for Navbar
it("Test for Navbar", () => {
  const tree = renderer
    .create(
      <HashRouter>
        <Navbar />
      </HashRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
