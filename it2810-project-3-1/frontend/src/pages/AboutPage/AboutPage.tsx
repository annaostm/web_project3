import { useMutation, useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { useState } from "react";
import { GET_INFO } from "../../graphql/query";
import { ADD_REVIEW, ADD_RATING } from "../../graphql/mutations";
import movie from "../../images/movie.jpeg";
import s_letter from "../../images/s_letter.png"; 
import './AboutPage.css';


//Defining an interface with the types of the fields returned object from the database.
interface Data {
  show_id: string;
  title: string;
  type: string;
  release_year: number;
  rating: string;
  description: string;
  ratings: [number];
  cast: string;
  country: string;
  director: string;
  duration: string;
  listed_in: [string];
  review_array: [string];
  image_url: string;
}

//Defining an interface with the types of the fields returned object from the database.
type NetflixObject = {
  findMovieById: Data;
};

export default function AboutPage() {
  //The unique show_id of the spesific movie/show, which we get from the end of the URL
  let id = window.location.href.split("/")[5];

  //Getting the data for the spesific movie/show, and storing it in a constant.
  const { loading, error, data } = useQuery<NetflixObject>(GET_INFO, {
    variables: { show_id: id },
  });


  //Constants for setting review and rating input from the user
  const [review_input, setReviewInput] = useState("");
  const [addReview, { data: reviewData }] = useMutation(ADD_REVIEW);

  const [rating_input, setRatingInput] = useState(0);
  const [addRating, { data: ratingData }] = useMutation(ADD_RATING);

  //Functions that make sure the functions that execute the query run, and alert the user that
  //their review/rating has been added to the database.
  function reviewSubmit() {
    addReview({ variables: { show_id: id, input: review_input } });
    alert("Review submitted! Your review will appear in the list:)");
    window.location.reload();
  }
  function ratingSubmit() {
    addRating({ variables: { show_id: id, input: rating_input } });
    alert(
      "Rating submitted! The average score for the title will now be recalculated:)"
    );
    window.location.reload();
  }

  //Calculating the score from all the ratings of the title.
  var ratingSum = data?.findMovieById.ratings.reduce((a, b) => a + b, 0);
  var ratingCount = data?.findMovieById.ratings.length;

  let score = "";
  if (ratingSum !== undefined && ratingCount !== undefined) {
    score = Math.round((ratingSum / ratingCount) * 20).toString() + "%";
  }

  //Error handling
  if (loading) return <p className="wait-text">Loading...</p>;
  if (error) return <p className="wait-text">Error :(</p>;

  let no_image = data?.findMovieById.type === "Movie" ? movie : s_letter;
  let full_img_url = "https://www.themoviedb.org/t/p/w200/"+data?.findMovieById.image_url;

  return (
    <div>
      
      <div className="about-box">
      
        <div className="extra-info">
        
          <h1 className="movie-title">{data?.findMovieById.title}</h1>
          <div>
            {data?.findMovieById.image_url === "" ? 
            <></> :
            <img className="poster" src={full_img_url} alt="Movie/series image" />}
          </div>

          <p className="movie-description">{data?.findMovieById.description}</p>
          <br />
          
          <div className="year-duration">
            <div className="year-duration-box">
              <Box
                sx={{
                  borderRadius: 0.5,
                  backgroundColor: "rgb(250, 46, 46)",
                  padding: 1,
                  fontWeight: "700",
                }}
              >
                Release year:{" "}
                {data?.findMovieById.release_year == null
                  ? "No available info about the release year for this title."
                  : data.findMovieById.release_year}
              </Box>
            </div>
            <div className="year-duration-box">
              <Box
                sx={{
                  borderRadius: 0.5,
                  backgroundColor: "rgb(250, 46, 46)",
                  padding: 1,
                  fontWeight: "700",
                }}
              >
                Duration:{" "}
                {data?.findMovieById.duration == null
                  ? "No available info about the duration for this title."
                  : data.findMovieById.duration}
              </Box>
            </div>
          </div>

          <br />
          <h4 className="subcategory-titles">Director</h4>
          <p>
            {data?.findMovieById.director == null
              ? "No available info about the director for this title."
              : data.findMovieById.director}
          </p>
          <br />
          <h4 className="subcategory-titles">Country</h4>
          <p>
            {data?.findMovieById.country == null
              ? "No available info about origin country for this title."
              : data.findMovieById.country}{" "}
          </p>
          <br />
          <h4 className="subcategory-titles">Cast</h4>
          <p>
            {data?.findMovieById.cast == null
              ? "No available info about the cast for this title."
              : data.findMovieById.cast}
          </p>
          <br />
          <h4 className="subcategory-titles">Listed in</h4>
          <div>
            {data?.findMovieById.listed_in.map((category) => {
              return (
                <p>
                  {category == null
                    ? "No available info about the categories for this title."
                    : category}
                </p>
              );
            })}
          </div>
        </div>

        <div className="rate-review">
          <br />
          <h4>Rating</h4>
          <div className="ratings">
            <div className="empty-stars"></div>
            <div
              className="full-stars"
              style={{ width: score }}
              aria-label="Rating score"
            ></div>
          </div>

          <p>
            Average score: {score}. Based on {ratingCount} ratings
          </p>
          <br />
          <h4>Reviews ({data?.findMovieById.review_array.length})</h4>
          {data?.findMovieById.review_array.map((review) => {
            return (
              <div>
                {" "}
                <br />
                <Box
                  aria-label="Reviews"
                  sx={{
                    backgroundColor: "#3498DB",
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                >
                  {review}
                </Box>
              </div>
            );
          })}
          <br />
          <br />
          <h4>Share your opinion</h4>
          <br />

          <div className="rate" aria-label="Click the stars to rate">
            <input
              aria-label="Star 5"
             
              type="radio"
              id="star5"
              name="rate"
              value="5"
              onClick={() => setRatingInput(5)}
            />
            <label htmlFor="star5" title="text"  data-cy="star-5">
              5 stars
            </label>
            <input
              aria-label="Star 4"
              type="radio"
              id="star4"
              name="rate"
              value="4"
              onClick={() => setRatingInput(4)}
            />
            <label htmlFor="star4" title="text" data-cy="star-4">
              4 stars
            </label>
            <input
              aria-label="Star 3"
              type="radio"
              id="star3"
              name="rate"
              value="3"
              onClick={() => setRatingInput(3)}
            />
            <label htmlFor="star3" title="text" data-cy="star-3">
              3 stars
            </label>
            <input
              aria-label="Star 2"
              type="radio"
              id="star2"
              name="rate"
              value="2"
              onClick={() => setRatingInput(2)}
            />
            <label htmlFor="star2" title="text" data-cy="star-2">
              2 stars
            </label>
            <input
              aria-label="Star 1"
              type="radio"
              id="star1"
              name="rate"
              value="1"
              onClick={() => setRatingInput(1)}
            />
            <label htmlFor="star1" title="text" data-cy="star-1">
              1 star
            </label>
          </div>
          {rating_input !== 0 ? (
            <button
              className="submit-button"
              onClick={() => ratingSubmit()}
              aria-label="Submit rating"
              data-cy="submit-rating"
            >
              Submit rating
            </button>
          ) : null}
          <br />
          <br />
          <div className="review">
            <br />

            <textarea
              aria-label="Write a review for the given movie/serie"
              data-cy="review"
              className="input-review"
              placeholder="Write a review"
              rows={6}
              cols={50}
              value={review_input}
              onChange={(e) => setReviewInput(e.target.value)}
            />
          </div>
          {review_input !== "" ? (
            <button
              className="submit-button"
              onClick={() => reviewSubmit()}
              aria-label="Submit review"
              data-cy="submit-review"
            >
              Submit review
            </button>
          ) : null}
        </div>
      </div>
     
    </div>
  );
}
