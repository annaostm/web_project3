import { gql } from "@apollo/client";
import { unmountComponentAtNode } from "react-dom";
import renderer from "react-test-renderer";
import DisplayData from "../components/displayData/DisplayData";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GET_DATA } from "../graphql/query";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'


// mocks for the apollo client
const mocks = [
  {
    request: {
      query: GET_DATA,
      variables: {
        limit: 10,
        offset: 0,
        type: "Movie",
        title: "Jaws",
        sort: "title",
        category: "",
      }

    },

    result: {
      data: {
        netflix: [
        {"show_id":"s42","title":"Jaws","type":"Movie","release_year":"1975","rating":"PG", "duration":"124 min", "listed_in":["Action & Adventure", "Classic Movies", "Dramas"]},
        {"show_id":"s43","title":"Jaws 2","type":"Movie","release_year":"1978","rating":"PG", "duration":"116 min", "listed_in":["Dramas", " Horror Movies", " Thrillers"]},
        {"show_id":"s44","title":"Jaws 3","type":"Movie","release_year":"1983","rating":"PG", "duration":"98 min", "listed_in":["Action & Adventure", " Horror Movies", " Thrillers"]},
        {"show_id":"s45","title":"Jaws: The Revenge","type":"Movie","release_year":"1987","rating":"PG-13", "duration":"91 min", "listed_in":["Action & Adventure", " Horror Movies", " Thrillers"]},
      ]
      }
    }
  }
];


it("renders without error", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <DisplayData type={"Movie"} input={"Jaws"} />
    </MockedProvider>
  );
  expect(await screen.findByText('Loading...')).toBeInTheDocument();
  
});

// mocks for the apollo client
const mocks2 = [
  {
    request: {
      query: gql`
        query Query {
          netflix {
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
        netflix: [
          {
            show_id: 1,
            title: "Jaws",
            type: "Movie",
            director: "director",
          },
        ],
      },
    },
  },
];

// setting up the mock for the apollo client

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

// Test for DisplayData
it("Test for DisplayData", () => {
  const tree = renderer
    .create(
      <MockedProvider mocks={mocks2}>
        <DisplayData type={"Movie"} input={"Jaws"} />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
