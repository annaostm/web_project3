"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_core_1 = require("apollo-server-core");
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// the data.
exports.typeDefs = (0, apollo_server_core_1.gql) `
  # This "Netflix" type defines the queryable fields for every Netflix movie/TV-show in our data source.

  type Netflix {
    _id: String
    show_id: String
    type: String
    title: String
    director: String
    country: String
    date_added: String
    release_year: String
    rating: String
    duration: String
    listed_in: [String]
    description: String
    cast: String
    ratings: [Int]
    review_array: [String]
    image_url: String
  }

  # Type definitions for the query and mutation
  # PaginatedNetflix is a custom type that returns the paginated data and the total count of the data

  type PaginatedNetflix {
    data: [Netflix]
    count: Int
  }

  # Mutation type for adding a review and rating to a movie/TV-show

  type Mutation {
    addReview(show_id: String, input: String): String
    addRating(show_id: String, input: Int): Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "netflix" query returns an array of zero or more movies (defined above).

  type Query {
    netflix(
      limit: Int
      offset: Int
      type: String
      title: String
      sort: String
      category: String
      image_url: String
    ): PaginatedNetflix
    findMovieById(show_id: String): Netflix
  }
`;
//# sourceMappingURL=typeDefs.js.map