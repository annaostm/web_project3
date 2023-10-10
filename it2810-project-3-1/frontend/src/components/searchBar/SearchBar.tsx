import './SearchBar.css';
import { useState } from "react";
import DisplayData from "../displayData/DisplayData";
import SelectLabels from "../filterButton/FilterButton";
import "./SearchBar.css";

// Interface for the search bar
interface SearchProps {
  type: string;
}

// SearchBar component that renders the search bar and the filter buttons
const SearchBar = (props: SearchProps) => {
  // State variables for the search bar
  const [input, setInput] = useState<string>("");

  //Options for sorting and filtering buttons
  const sort_by: string[] = ["Title","Oldest", "Newest"];
  const listed_in_movies: string[] = [
    "Action & Adventure",
    "Horror Movies",
    "Sci-Fi & Fantasy",
    "Children & Family Movies",
    "Classic Movies",
    "Comedies",
    "Music & Musicals",
    "Documentaries",
    "Dramas",
    "Romantic Movies",
    "Thrillers",
  ];
  const listed_in_series: string[] = [
    "Anime Series",
    "British TV Shows",
    "Crime TV Shows",
    "Docuseries",
    "Kids' TV",
    "Korean TV Shows",
    "Reality TV",
    "TV Action & Adventure",
    "TV Comedies",
    "TV Dramas",
    "TV Horror",
    "TV Mysteries",
    "International TV Shows",
  ];

  //Sorts the array of genres alphabetically
  listed_in_series.sort();
  listed_in_movies.sort();

  //Renders the search bar and the filter buttons
  return (
    <div className="search-filter-grid">
      <div className="content">
        <div className="title">
          <p>Search for {props.type === "Movie" ? "movies" : "TV shows"}</p>
        </div>
        <div className="search-bar-field">
          <input
            className="search-bar"
            aria-label="Search bar"
            type="text"
            data-cy="search"
            placeholder="Search for entertainment..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <div className="filter_buttons">
            <SelectLabels
              options={
                props.type === "TV Show" ? listed_in_series : listed_in_movies
              }
              name={"Filter"}
            />
            <SelectLabels options={sort_by} name={"Sort by"} />
          </div>
        </div>
        {input.length > 0 ? (
          <DisplayData type={props.type} input={input} />
        ) : (
          <DisplayData type={props.type} />
        )}
      </div>
    </div>
  );
};
export default SearchBar;
