import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import React from "react";
const YearDropdown = ({ yearsToShow, selectedYear }) => {
  useEffect(() => {
    if (selectedYear)
      $("#ddlYear option[value='" + selectedYear + "']").prop("selected", true);
  }, []);

  function getYears() {
    const currentYear = new Date().getFullYear();
    return Array(yearsToShow)
      .fill({})
      .map((o, index) => {
        return { id: currentYear - index, name: currentYear - index };
      });
  }

  return (
    <Dropdown label="Year:" id="ddlYear" name="ddlYear" data={getYears()} />
  );
};
export default YearDropdown;
