/** @format */

import React from "react";
import { useState } from "react";
import { Input, AutoComplete } from "antd";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import { useNavigate } from "react-router";

export default function SearchBar(props) {
  const InputStyle = props.style;
  const hasPrefix = props.hasPrefix;
  const searchType = props.searchType;
  const autoCompleteStyle = props.autoCompleteStyle;
  const setSchool = props.setSchool;
  const setSearchType = props.setSearchType;
  const schoolSearch = props.schoolSearch;
  const setSchoolSearch = props.setSchoolSearch;
  const navigate = useNavigate();

  // Sample options for autocompletion
  const options = [
    { value: "Option 1" },
    { value: "Option 2" },
    { value: "Option 3" },
    { value: "Option 4" },
    { value: "Option 5" },
    { value: "Option 6" },
    { value: "Option 7" },
    { value: "Option 8" },
    { value: "Option 9" },
    // Add more options as needed
  ];

  // State to control the input value
  const [inputValue, setInputValue] = useState(props.inputValue || "");

  // Callback when an option is selected
  const handleSelect = (value) => {
    if (searchType === "school") {
      setSchool({ name: value });
      setSearchType("professor");

      if (schoolSearch) {
        setSchoolSearch(false);
      }
    } else if (searchType === "professor") {
      setInputValue(value);
    } else {
      setSchool({ name: value });
      setInputValue(value);
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    let input = e.target.value;
    setInputValue(input);
    if (searchType === "student") {
      setSchool({ name: input });
    }
  };

  // handle Search
  const handleKeyPress = (e) => {
    if (searchType === "professor" && e.key === "Enter" && inputValue.trim() !== "") {
      const professorName = encodeURIComponent(inputValue.trim());

      const url = `/search/professors/?professorName=${professorName}`;

      navigate(url); // Use navigate to change the route
    }
  };

  return (
    <AutoComplete
      disabled={props.disabled}
      style={autoCompleteStyle}
      dropdownStyle={{
        maxHeight: "auto",
        overflowY: "scroll",
      }}
      options={options.map((option) => ({ value: option.value }))}
      onSelect={handleSelect}
      value={props.school ? props.school.name : inputValue}
      filterOption={(inputValue, option) => option.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1}>
      <Input
        style={props.disabled ? { backgroundColor: "transparent", border: "none", color: "black" } : InputStyle}
        placeholder={searchType === "professor" ? "Professor name" : "Your school"}
        onChange={handleInput}
        prefix={hasPrefix ? searchType === "professor" ? <PsychologyAltIcon /> : <SchoolOutlinedIcon /> : null}
        onPressEnter={handleKeyPress}
      />
    </AutoComplete>
  );
}
