import SearchBar from "../components/searchBar/SearchBar";

//Renders the search bar and the filter buttons with the type "Movie"
//This is the page that is rendered when the user clicks on the "Movies" button in the navbar
export function MoviesPage() {
  return (
    <div>
      <SearchBar type={"Movie"} />
    </div>
  );
}
