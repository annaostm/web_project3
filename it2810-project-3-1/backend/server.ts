import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault
} from "apollo-server-core";
import express from "express";
import http from "http";
import Netflix from "./models";
import { typeDefs } from "./typeDefs";

// MovieArgs for the netflix query
type MoviesArgs = {
  limit?: number;
  offset?: number;
  title?: string;
  type?: string;
  sort?: string;
  category?: string;
};

// MovieByIdArgs for the findMovieById query
type MovieByIdArgs = {
  show_id: string;
};

// ReviewMutationArgs for the addReview mutation

type ReviewMutationArgs = {
  show_id: string;
  input: string;
};

// RatingMutationArgs for the addRating mutation
type RatingMutationArgs = {
  show_id: string;
  input: number;
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves movies/shows from the "netflix" quarray above.
// We must apply async and await, so that the query won't be sent before the backend has
//conected with the database.

const resolvers = {
  // Resolver for the netflix query
  Query: {
    netflix: async (_parent: unknown, args: MoviesArgs) => {
      const actualLimit = args.limit ?? 10;
      const actualOffset = args.offset ?? 0;

      // If the user has searched for a movie/TV-show and has selected a filter,
      // we will use the title argument and category to filter the data
      if (args.title && args.category) {
        return {
          count: await Netflix.countDocuments({
            type: args.type,
            title: { $regex: args.title, $options: "i" },
            listed_in: { $in: [args.category, " " + args.category] },
          }).exec(),
          data: await Netflix.find({
            type: args.type,
            title: { $regex: args.title, $options: "i" },
            listed_in: { $in: [args.category, " " + args.category] },
          })
            .limit(actualLimit)
            .skip(actualOffset)
            .sort(args.sort)
            .sort("show_id")
            .exec(),
        };
      }

      // If the user has searched for a movie/TV-show, we will use the title argument to filter the data

      if (args.title) {
        return {
          count: await Netflix.countDocuments({
            type: args.type,
            title: { $regex: args.title, $options: "i" },
          }).exec(),
          data: await Netflix.find({
            type: args.type,
            title: { $regex: args.title, $options: "i" },
          })
            .limit(actualLimit)
            .skip(actualOffset)
            .sort(args.sort)
            .sort("show_id")
            .exec(),
        };
      }

      // If the user has selected a filter, we will use the category argument to filter the data
      if (args.category) {
        return {
          count: await Netflix.countDocuments({
            type: args.type,
            listed_in: { $in: [args.category, " " + args.category] },
          }).exec(),
          data: await Netflix.find({
            type: args.type,
            listed_in: { $in: [args.category, " " + args.category] },
          })
            .limit(actualLimit)
            .skip(actualOffset)
            .sort(args.sort)
            .sort("show_id")
            .exec(),
        };
      }

      // If the user has not searched for a movie/TV-show or selected a filter, we will return all the data
      return {
        count: await Netflix.countDocuments({ type: args.type }).exec(),
        data: await Netflix.find({ type: args.type })
          .limit(actualLimit)
          .skip(actualOffset)
          .sort(args.sort)
          .sort("show_id")
          .exec(),
      };
    },
    // Resolver for the findMovieById query
    findMovieById: async (_parent: unknown, args: MovieByIdArgs) => {
      return await Netflix.findOne({ show_id: args.show_id }).exec();
    },
  },

  // Resolver for the addReview mutation
  Mutation: {
    // Mutation for adding a review to a movie/TV-show
    addReview: async (_parent: unknown, args: ReviewMutationArgs) => {
      try {
        await Netflix.updateOne(
          { show_id: args.show_id },
          { $push: { review_array: args.input } }
        ).exec();
        return args.input;
      } catch (error) {
        console.error(error);
        return error;
      }
    },

    // Mutation for adding a rating to a movie/TV-show
    addRating: async (_parent: unknown, args: RatingMutationArgs) => {
      try {
        await Netflix.updateOne(
          { show_id: args.show_id },
          { $push: { ratings: args.input } }
        ).exec();
        return args.input;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
  },
};

async function startApolloServer(typeDefs: any, resolvers: any) {
  // Required logic for integrating with Express
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,
    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/graphql",
  });

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);

//Handler for request to the netflix route
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

mongoose.connect("mongodb://it2810-45.idi.ntnu.no:27017/webdev");
