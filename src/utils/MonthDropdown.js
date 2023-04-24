import { useEffect, useState } from "react";

import React from "react";
import Dropdown from "./Dropdown";
const MonthDropdown = ({ showFullName, selectedMonth }) => {
  useEffect(() => {
    if (selectedMonth)
      $("#ddlMonth option[value='" + selectedMonth + "']").prop(
        "selected",
        true
      );
  }, []);

  function getMonths() {
    var monthsFullName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthsShortName = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthsName = showFullName ? monthsFullName : monthsShortName;
    return Array(12)
      .fill({})
      .map((o, index) => {
        return { id: index, name: monthsName[index] };
      });
  }

  return (
    <>
      <Dropdown
        label="Month:"
        id="ddlMonth"
        name="ddlMonth"
        data={getMonths()}
      />

      {/* <div>
        <br></br>
        <label>Month:</label>
      </div>
      <select name="ddlMonth" id="ddlMonth">
        {getMonths().map((o, index) => {
          console.log("MONTH I:", index, ", V:", o);
          return (
            <option key={index} value={index}>
              {o}
            </option>
          );
        })}
      </select>
       */}
    </>
  );
};
export default MonthDropdown;
