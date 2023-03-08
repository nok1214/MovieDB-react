import React from "react";
import { OPTIONS } from "../constants";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";

const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px;
  background-color: rgb(144, 206, 161);
`;

export default function OptionSelector({
  options,
  setOptions,
  setCurrentPage,
}) {
  const handleOptionChange = (e) => {
    setOptions(e.target.value);
    setCurrentPage(1);
  };
  return (
    <OptionsContainer>
      <Select variant='standard' value={options} onChange={handleOptionChange}>
        {Object.values(OPTIONS).map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.title}
            </MenuItem>
          );
        })}
      </Select>
    </OptionsContainer>
  );
}
