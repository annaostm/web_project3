import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import movie from "../../images/movie.jpeg";
import s_letter from "../../images/s_letter.png";
import TablePaginationActions from "../pagination/Pagination";
import { useReactiveVar } from "@apollo/client";
import { sortStorageVar, filterStorageVar } from "../filterButton/FilterButton";
import { Link } from "react-router-dom";
import { GET_DATA } from "../../graphql/query";
import "./DisplayData.css";


//Movie interface that defines the type of the netflix object
export interface Data {
  show_id: string;
  title: string;
  type: string;
  release_year: number;
  rating: string;
  country: string;
  duration: string;
  listed_in: string[];
  image_url: string;
}

//NetFlix type that defines the type of the netflix object
type NetflixList = {
  netflix: {
    count: number; //number of total movie/serie objects
    data: Data[]; //array of movie/serie objects
  };
};

//dataProps interface for the DisplayData component
interface dataProps {
  type?: string;
  input?: string;
}

//DisplayData is the component that displays all the movies and series in a table
export default function DisplayData(props: dataProps) {
  //Setting the limit and offset values for the pagination
  const [batchSize, setBatchSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(0);

  //Getting global state variables from the filter buttons
  const sortStorage = useReactiveVar(sortStorageVar);
  const filterStorage = useReactiveVar(filterStorageVar);

  //Reset sortStorage and filterStorage when the type changes
  useEffect(() => {
    sortStorageVar("");
    filterStorageVar("");
  }, [props.type]);

  //Updating the pagination when serach input changes or when the filter or sort buttons are clicked
  useEffect(() => {
    setPageNumber(0);
  }, [props.input, sortStorage, filterStorage]);

  //useQuery hook that gets the data from the database
  const { loading, error, data } = useQuery<NetflixList>(GET_DATA, {
    variables: {
      limit: batchSize,
      offset: pageNumber * batchSize,
      type: props.type,
      title: props.input,
      sort: sortStorage,
      category: filterStorage,
    },
  });

  //Error handling
  if (loading) return <p className="wait-text">Loading...</p>; //If loading
  if (error) return <p className="wait-text">Error :(</p>; //If error
  if (data && data?.netflix.count < 1)
    return <p className="wait-text">No content matched your search</p>; //If no data

  //Function that handles the page change
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageNumber(newPage);
  };

  //Function that handles the batch size change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBatchSize(parseInt(event.target.value, 10));
    setPageNumber(0);
  };


  let no_image = props.type === "Movie" ? movie : s_letter

  return (
    <div>
      <div className="netflix-cards" aria-label="Nextflix cards">
        {data?.netflix.data.map((netflix: Data) => (
          <div key={netflix.show_id}>
            <div aria-label="A Movie/A Serie">
              <Card sx={{ width: 200 }}>
                <CardMedia
                  component="img"
                  height="270"
                  image={netflix.image_url ? "https://www.themoviedb.org/t/p/w300/" + netflix.image_url : no_image}
                  alt="movie/serie image"
                />
                <CardContent className="card-content" sx={{ height: 140 }}>
                  <Typography
                    className="content-text"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {netflix.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {"Released: " + netflix.release_year} <br></br>{" "}
                    {"Categories: " + netflix.listed_in}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link onClick={() => console.log(netflix.show_id)} to={netflix.show_id} className="link2" data-cy="about-link">
                    Learn More
                  </Link>
                </CardActions>
              </Card>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                5,
                10,
                25,
                { label: "All", value: data?.netflix.count || 0 },
              ]}
              colSpan={3}
              count={data?.netflix.count ?? 0}
              rowsPerPage={batchSize}
              page={pageNumber}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              sx={{
                color: "white",
                backgroundColor: "#191b20",
                "& .MuiTablePagination-selectIcon	": {
                  color: "white",
                },
                borderBottom: 0,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </div>
    </div>
  );
}
