import SearchBar from "../components/searchBar/SearchBar";

//Renders the search bar and the filter buttons with the type "TV Show"
//This is the page that is rendered when the user clicks on the "Series" button in the navbar
export function SeriesPage() {
  return (
    <div>
      <SearchBar type={"TV Show"} />
    </div>
  );
}
