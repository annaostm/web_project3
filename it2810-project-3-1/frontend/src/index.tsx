import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";

//Making a root element to render the app
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

//Apollo client that connects to the backend
const client = new ApolloClient({
  uri: "http://it2810-45.idi.ntnu.no:4000/graphql",
  cache: new InMemoryCache(),
});

//Rendering the app with the apollo provider
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
