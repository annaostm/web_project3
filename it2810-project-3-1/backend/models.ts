import mongoose from "mongoose";

//Schema for the Netflix data
const NetflixSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  show_id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  date_added: {
    type: String,
    required: true,
  },
  release_year: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  listed_in: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cast: {
    type: String,
    required: false,
  },
  ratings: {
    type: [Number],
    required: false,
  },
  review_array: {
    type: [String],
    required: false,
  },
  image_url: {
    type: String,
    required: false,
  }
});

//Export the schema as a model
const Netflix = mongoose.model("movies2", NetflixSchema);
export default Netflix;
