"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const models_1 = __importDefault(require("./models"));
const typeDefs_1 = require("./typeDefs");
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves movies/shows from the "netflix" quarray above.
// We must apply async and await, so that the query won't be sent before the backend has
//conected with the database.
const resolvers = {
    // Resolver for the netflix query
    Query: {
        netflix: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            const actualLimit = (_a = args.limit) !== null && _a !== void 0 ? _a : 10;
            const actualOffset = (_b = args.offset) !== null && _b !== void 0 ? _b : 0;
            // If the user has searched for a movie/TV-show and has selected a filter,
            // we will use the title argument and category to filter the data
            if (args.title && args.category) {
                return {
                    count: yield models_1.default.countDocuments({
                        type: args.type,
                        title: { $regex: args.title, $options: "i" },
                        listed_in: { $in: [args.category, " " + args.category] },
                    }).exec(),
                    data: yield models_1.default.find({
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
                    count: yield models_1.default.countDocuments({
                        type: args.type,
                        title: { $regex: args.title, $options: "i" },
                    }).exec(),
                    data: yield models_1.default.find({
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
                    count: yield models_1.default.countDocuments({
                        type: args.type,
                        listed_in: { $in: [args.category, " " + args.category] },
                    }).exec(),
                    data: yield models_1.default.find({
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
                count: yield models_1.default.countDocuments({ type: args.type }).exec(),
                data: yield models_1.default.find({ type: args.type })
                    .limit(actualLimit)
                    .skip(actualOffset)
                    .sort(args.sort)
                    .sort("show_id")
                    .exec(),
            };
        }),
        // Resolver for the findMovieById query
        findMovieById: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield models_1.default.findOne({ show_id: args.show_id }).exec();
        }),
    },
    // Resolver for the addReview mutation
    Mutation: {
        // Mutation for adding a review to a movie/TV-show
        addReview: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield models_1.default.updateOne({ show_id: args.show_id }, { $push: { review_array: args.input } }).exec();
                return args.input;
            }
            catch (error) {
                console.error(error);
                return error;
            }
        }),
        // Mutation for adding a rating to a movie/TV-show
        addRating: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield models_1.default.updateOne({ show_id: args.show_id }, { $push: { ratings: args.input } }).exec();
                return args.input;
            }
            catch (error) {
                console.error(error);
                return error;
            }
        }),
    },
};
function startApolloServer(typeDefs, resolvers) {
    return __awaiter(this, void 0, void 0, function* () {
        // Required logic for integrating with Express
        const app = (0, express_1.default)();
        // Our httpServer handles incoming requests to our Express app.
        // Below, we tell Apollo Server to "drain" this httpServer,
        // enabling our servers to shut down gracefully.
        const httpServer = http_1.default.createServer(app);
        // Same ApolloServer initialization as before, plus the drain plugin
        // for our httpServer.
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs,
            resolvers,
            csrfPrevention: true,
            cache: "bounded",
            plugins: [
                (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
                (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true }),
            ],
        });
        // More required logic for integrating with Express
        yield server.start();
        server.applyMiddleware({
            app,
            // By default, apollo-server hosts its GraphQL endpoint at the
            // server root. However, *other* Apollo Server packages host it at
            // /graphql. Optionally provide this to match apollo-server.
            path: "/graphql",
        });
        // Modified server startup
        yield new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}
startApolloServer(typeDefs_1.typeDefs, resolvers);
//Handler for request to the netflix route
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});
mongoose_1.default.connect("mongodb://it2810-45.idi.ntnu.no:27017/webdev");
//# sourceMappingURL=server.js.map