import renderer from "react-test-renderer";
import SearchBar from "../components/searchBar/SearchBar";
import "@testing-library/jest-dom/extend-expect";
import { gql } from "@apollo/client";
import { unmountComponentAtNode } from "react-dom";
import { MockedProvider } from "@apollo/client/testing";

// setup a DOM element as a render target

let container: Element | DocumentFragment | null = null;

// setting up mocks for the apollo client

const mocks = [
  {
    request: {
      query: gql`
        query Query {
          movies {
            show_id
            title
            type
            director
          }
        }
      `,
    },
    result: {
      data: {
        movies: [
          {
            show_id: 1,
            title: "My Little Pony: A New Generation",
            type: "TV Show",
            director: "director",
          },
        ],
      },
    },
  },
];

// setting up the mock for the apollo client
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

const b = renderer.create(
  <MockedProvider mocks={mocks}>
    <SearchBar type="Movie" />
  </MockedProvider>
);

//Test for SearchBar

it("Test for SearchBar", () => {
  const tree = b.toJSON();
  expect(tree).toMatchSnapshot();
});
