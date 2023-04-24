import { useState } from "react";
import Shimmer from "./Shimmer";
import ReportShimmerNoAnimate from "./ShimmerNoAnimate";
import ShimmerNoAnimate from "./ShimmerNoAnimate";

import "./../css/master.css";
import "./../css/table.css";
const Table = ({ data, tableConfig, columnConfig, error }) => {
  const columnHeaders = data && data.length > 0 ? Object?.keys(data[0]) : [];
  const [isAsc, setIsAsc] = useState(true);

  if (error && error !== "") return <ShimmerNoAnimate message={error} />;
  if (!data) return <Shimmer message={"Loading..."} />;

  function getCellIndexByColumn(column) {
    return $(".r-table .header")
      .find('div[id="' + column + '"]')
      .index();
  }

  //https://stackoverflow.com/questions/5002848/how-to-define-custom-sort-function-in-javascript
  function sortByHeaderText(caption) {
    var result = function (a, b) {
      if (!isAsc) return (a[caption] > b[caption]) - (a[caption] < b[caption]);
      else return (a[caption] < b[caption]) - (a[caption] > b[caption]);
    };

    if (isAsc) $(".arrow").removeClass("fa-arrow-down").addClass("fa-arrow-up");
    else $(".arrow").removeClass("fa-arrow-up").addClass("fa-arrow-down");

    var index = getCellIndexByColumn(caption) + 1;
    $(".r-table .arrow").removeClass("arrow-active").addClass("arrow-inactive");
    $(".r-table .header .header-cell:nth-child(" + index + ") .arrow")
      .removeClass("arrow-inactive")
      .addClass("arrow-active");

    setIsAsc(!isAsc);
    return result;
  }

  function sortByColumnName(colName) {
    if (isColumnSortable(colName)) {
      data.sort(sortByHeaderText(colName));
    }
  }

  function getColCaption(column) {
    return columnConfig?.find(({ Column }) => Column === column)?.Caption;
  }
  function isColumnSortable(column) {
    return columnConfig?.find(({ Column }) => Column === column)?.Sortable;
  }
  function isColumnHidden(column) {
    return columnConfig?.find(({ Column }) => Column === column)?.Hidden;
  }
  function showSumInFooter(column) {
    return columnConfig?.find(({ Column }) => Column === column)
      ?.ShowSumInFooter;
  }

  let footerTexts = [];
  function SumForFooter(item) {
    const ikey = item[0];
    const ival = item[1];
    footerTexts[ikey] =
      isNaN(ival) || ival === null ? "" : footerTexts[ikey] + parseInt(ival);
  }

  if (data && data.length === 0)
    return <ReportShimmerNoAnimate message={"No Records"} />;

  return !data ? (
    <div>Loading Table data...</div>
  ) : (
    <div className="r-table-container" id="mmm">
      <div className="r-table" id="qqq">
        <div className="r-table-body">
          <div key={"header"} className="header">
            {columnHeaders?.map((column, index) => {
              if (showSumInFooter(column)) footerTexts[column] = 0;
              return isColumnHidden(column) ? (
                <></>
              ) : (
                <>
                  <div
                    key={index}
                    className={
                      isColumnSortable(column)
                        ? "header-cell"
                        : "header-cell cursor-default"
                    }
                    id={column}
                    onClick={() => {
                      sortByColumnName(column);
                    }}
                  >
                    <span> {getColCaption(column) ?? column}</span>
                    {isColumnSortable(column) && (
                      <span className="arrow arrow-inactive fa fa-arrow-down"></span>
                    )}
                  </div>
                </>
              );
            })}

            {tableConfig.AllowEdit && (
              <div key="Edit" className="header-cell">
                <span>Edit</span>
              </div>
            )}
          </div>
          {data?.map((row, index) => {
            return (
              <div key={index} className="content">
                {Object.values(row).map((cell, index) => {
                  if (showSumInFooter(Object.entries(row)[index][0]))
                    SumForFooter(Object.entries(row)[index]);

                  return isColumnHidden(Object.entries(row)[index][0]) ? (
                    <></>
                  ) : (
                    <div key={index} className="content-cell">
                      {cell}
                    </div>
                  );
                })}
                {tableConfig.AllowEdit && (
                  <div key={index} className="content-cell">
                    <input type="button" value="Edit"></input>
                  </div>
                )}
              </div>
            );
          })}
          {tableConfig.ShowFooter && (
            <div key={"footer"} className="footer">
              {columnHeaders?.map((cell, index) => {
                return isColumnHidden(cell) ? (
                  <></>
                ) : (
                  <div key={index} className="footer-cell">
                    {footerTexts[cell]}
                  </div>
                );
              })}
              {tableConfig.AllowEdit && (
                <div key={"edt"} className="footer-cell"></div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Table;
