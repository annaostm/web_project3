import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { makeVar } from "@apollo/client";
import "./FilterButton.css";

//Interface for the filter button
interface FilterProps {
  options: string[]; //array of options for the filter/sort button
  name: string; //name of the filter/sort button
}

//filterStorageVar and sortStorageVar are reactive variables that stores the filter and sort value
export const sortStorageVar = makeVar("");
export const filterStorageVar = makeVar("");

//FilterButton component that renders the filter buttons (sort and filter)
export default function SelectLabels(props: FilterProps) {
  const [filter, setFilter] = useState<string>("");

  //handleChange function that handles the change of the filter/sort button
  const handleChange = (event: SelectChangeEvent) => {
    if (props.name === "Sort by") {
      //If event.target.value is "Oldest" then sortStorage will be set to a string stating that the data should be sorted by release year in ascending order
      if (event.target.value === "Oldest") sortStorageVar("release_year");
      //If event.target.value is "Newest" then sortStorage will be set to a string stating that the data should be sorted by release year in descending order
      else if (event.target.value === "Newest") sortStorageVar("-release_year");
      else if (event.target.value === "Title") sortStorageVar("title");
      //If event.target.value is empty then sortStorage will be set to an empty string
      else if (event.target.value === "") sortStorageVar("");
    }
    //If the name of the filter button is "Filter by" then filterStorage will be set to the value of the filter button
    else {
      setFilter(event.target.value);
      if (event.target.value === "All") {
        filterStorageVar("");
      } else filterStorageVar(event.target.value);
    }
  };

  return (
    <div className="filter">
      <FormControl sx={{ color: "white", m: 1, minWidth: 200 }}>
        <InputLabel
          id="demo-simple-select-helper-label"
          sx={{ color: "black" }}
        >
          {props.name}
        </InputLabel>
        <Select
          MenuProps={{ disableScrollLock: true }}
          sx={{
            backgroundColor: "white",
            color: "black",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "red",
            },
            ".Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "red",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "red",
            },
            ".MuiSvgIcon-root ": {
              fill: "black !important",
            },
          }}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          defaultValue={""}
          label="filter"
          data-cy="filter-menu"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>{props.name === "Sort by" ? "None" : "All"}</em>
          </MenuItem>
          {props.options.map((item, index) => {
            return (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
