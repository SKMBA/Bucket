import { useState, useEffect } from "react";
import MonthDropdown from "../utils/MonthDropdown";
import YearDropdown from "../utils/YearDropdown";
import Dropdown from "../utils/Dropdown";

import { YEARS_TO_SHOW } from "../constants";

const ReportFilter = ({
  dropdownData,
  filterButtonClickHandler,
  defaultRegionId,
  defaultMonth,
  defaultYear,
}) => {
  const [toggleFilterIcon, setToggleFilterIcon] = useState(false);
  const [toggleFilterControls, setToggleFilterControls] = useState(false);
  const [regionId, setRegionId] = useState(defaultRegionId);
  const [month] = useState(defaultMonth);
  const [year] = useState(defaultYear);

  // console.log("filterButtonClickHandler", filterButtonClickHandler);
  // console.log("dropdownData", dropdownData);
  // console.log("defaultRegionId", defaultRegionId);
  // console.log("defaultMonth", defaultMonth);
  // console.log("dropdownDadefaultYearta", defaultYear);

  useEffect(() => {
    // console.log("ReportFilter-useEffect-month", month);
    // console.log("ReportFilter-useEffect-year", year);
    // console.log("ReportFilter-useEffect-regionId", regionId);

    $("#ddlRegion option[value='" + regionId + "']").prop("selected", true);
  }, [toggleFilterIcon]);

  btnApplyFilterClick = () => {
    const mm = parseInt($("#ddlMonth").val());
    const yyyy = $("#ddlYear").val();
    const rId = $("#ddlRegion").val();
    $("#ddlRegion option[value='" + rId + "']").prop("selected", true);
    filterButtonClickHandler(rId, yyyy, mm);
  };

  return (
    <>
      <div className="filter-button">
        <i
          className="fa fa-filter filter-icon"
          onClick={(o) => {
            setToggleFilterControls(!toggleFilterControls);
            $("#filter-control").toggle();
            // o.preventDefault;
            // debugger;
            // return false;
          }}
        ></i>

        {/* <button
          id="btnFilter"
          onClick={(o) => {
            setFilter(!filter);
            o.preventDefault;
            debugger;
            return false;
          }}
        >
        </button> */}
      </div>

      <div className="filter drs_container" shown="true" id="filter-control">
        <div className="MonthDropdown drs_flex_even">
          <MonthDropdown showFullName={false} selectedMonth={month} />
        </div>
        <div className="YearDropdown drs_flex_even">
          <YearDropdown yearsToShow={YEARS_TO_SHOW} selectedYear={year} />
        </div>
        <div className="LocationDropdown drs_flex_even">
          <Dropdown
            className="ddl-region"
            label="Region:"
            id="ddlRegion"
            name="ddlRegion"
            data={dropdownData}
          />
        </div>
        <div className="btn-apply-filter clearfix">
          <input
            type="button"
            onClick={btnApplyFilterClick}
            name="btnShowReport"
            value="Apply Filter"
            id="btnShowReport"
            className=""
          ></input>
        </div>
      </div>
    </>
  );
};
export default ReportFilter;
