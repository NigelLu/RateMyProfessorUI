/** @format */

import React from "react";
import { useState } from "react";
import { Input, AutoComplete } from "antd";
import { useNavigate } from "react-router";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

export default function SearchBar(props) {
  const InputStyle = props.style;
  const hasPrefix = props.hasPrefix;
  const searchType = props.searchType;
  const autoCompleteStyle = props.autoCompleteStyle;
  const setSchool = props.setSchool;
  const setSearchType = props.setSearchType;
  const schoolSearch = props.schoolSearch;
  const setSchoolSearch = props.setSchoolSearch;
  const current_school = props.current_school;

  // options for autocompletion
  const options = props.options;
  const navigate = useNavigate();

  // map the options by searchType
  let selectOptions =
    searchType === "professor"
      ? options.map((option) => ({ ...option, value: option.firstName + " " + option.lastName }))
      : options.map((option) => ({ ...option, value: option.name }));

  // State to control the input value
  const [inputValue, setInputValue] = useState(props.inputValue || "");

  // Callback when an option is selected
  const handleSelect = (value, option) => {
    if (searchType === "school") {
      setSchool({ name: value, id: option.id });
      setSearchType("professor");
      localStorage.setItem("currentSchool", JSON.stringify({ name: value, id: option.id }));
      setInputValue();

      if (schoolSearch) {
        setSchoolSearch(false);
      }
    } else if (searchType === "professor") {
      // when select a professor through the options on click, navigate to the prof page
      navigate("/professor/" + option.id);
    } else if (searchType === "student") {
      setSchool({ name: value, id: option.id });
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

      const url = `/search/professors/${current_school.id}/${professorName}`;

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
      options={selectOptions}
      onSelect={handleSelect}
      value={props.school ? props.school.name : inputValue}
      filterOption={(inputValue, option) => option.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1}
    >
      <Input
        onChange={handleInput}
        onPressEnter={handleKeyPress}
        placeholder={searchType === "professor" ? "Professor name" : "Your school"}
        prefix={hasPrefix ? searchType === "professor" ? <PersonSearchIcon /> : <SchoolOutlinedIcon /> : null}
        style={props.disabled ? { backgroundColor: "transparent", border: "none", color: "black" } : InputStyle}
      />
    </AutoComplete>
  );
}
