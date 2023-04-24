import { useEffect, useState } from "react";
import { DevoteeData } from "../constants";
// import Button from "@mui/material/Button";

const Table = ({ data, onSort }) => {
  const [tableData, setTableData] = useState(null);
  const [allData, setAllData] = useState(null);
  const [isAsc, setIsAsc] = useState(true);
  const editColumnWidth = "100px";
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    // const data = await fetch("http://drsdemo:8080/DRSHandler.ashx?mode=TEST");
    // const json = await data.json();
    // setTableData(json.data);
    // setAllData(json);
    //console.log("FETCHED-json", json);

    setTableData(DevoteeData.data);
    setAllData(DevoteeData);

    console.log("SAVED-state", tableData);
    console.log(allData);
  }
  //https://stackoverflow.com/questions/5002848/how-to-define-custom-sort-function-in-javascript
  function sortByHeaderText(caption) {
    var result = function (a, b) {
      if (isAsc) return (a[caption] > b[caption]) - (a[caption] < b[caption]);
      else return (a[caption] < b[caption]) - (a[caption] > b[caption]);
    };
    setIsAsc(!isAsc);
    return result;
  }

  function sortByColumnName(colName) {
    if (isColumnSortable(colName)) {
      var srt = tableData.sort(sortByHeaderText(colName));
      setTableData(srt);
    }
  }

  function getColWidth(column) {
    return allData?.colProps?.find(({ Column }) => Column === column)?.Width;
  }
  function getColCaption(column) {
    return allData?.colProps?.find(({ Column }) => Column === column)?.Caption;
  }
  function isColumnSortable(column) {
    return allData?.colProps?.find(({ Column }) => Column === column)?.Sortable;
  }
  function isColumnHidden(column) {
    return allData?.colProps?.find(({ Column }) => Column === column)?.Hidden;
  }

  function showSumInFooter(column) {
    return allData?.colProps?.find(({ Column }) => Column === column)
      .ShowSumInFooter;
  }

  let footerTexts = [];
  function SumForFooter(item) {
    const ikey = item[0];
    const ival = item[1];
    footerTexts[ikey] =
      isNaN(ival) || ival === null ? "" : footerTexts[ikey] + parseInt(ival);
  }
  return !tableData ? (
    <div>Loading Table data...</div>
  ) : (
    <>
      <div className="mytable overflow-auto max-h-fit m-3">
        <div key={"header"} className="header flex">
          {Object?.keys(tableData[0])?.map((column, index) => {
            if (showSumInFooter(column)) footerTexts[column] = 0;
            return isColumnHidden(column) ? (
              <></>
            ) : (
              <div
                key={index}
                className={
                  "p-2 border border-black min-w-[" +
                  getColWidth(column) +
                  "] cursor-pointer bg-slate-200"
                }
                onClick={() => {
                  sortByColumnName(column);
                }}
              >
                {getColCaption(column) ?? column}
              </div>
            );
          })}

          {allData.tableConfig.AllowEdit && (
            <div
              key="Edit"
              className={
                "p-2 border border-black min-w-[" +
                editColumnWidth +
                "] bg-slate-200"
              }
            >
              Edit
            </div>
          )}
        </div>
        {tableData?.map((row, index) => {
          return (
            <div key={index} className="tablebody flex">
              {Object.values(row).map((cell, index) => {
                if (showSumInFooter(Object.entries(row)[index][0]))
                  SumForFooter(Object.entries(row)[index]);

                return isColumnHidden(Object.entries(row)[index][0]) ? (
                  <></>
                ) : (
                  <div
                    key={index}
                    className={
                      "p-2 border border-black min-w-[" +
                      getColWidth(Object.entries(row)[index][0]) +
                      "]"
                    }
                  >
                    {cell}
                  </div>
                );
              })}

              {allData.tableConfig.AllowEdit && (
                <div
                  key={index}
                  className={
                    "p-2 border border-black min-w-[" + editColumnWidth + "]"
                  }
                >
                  <input type="button" value="Edit"></input>
                  {/* <Button variant="contained">Hello World</Button> */}
                </div>
              )}
            </div>
          );
        })}
        {allData.tableConfig.ShowFooter && (
          <div key={"footer"} className="footer flex">
            {Object?.keys(tableData[0])?.map((cell, index) => {
              return isColumnHidden(cell) ? (
                <></>
              ) : (
                <div
                  key={index}
                  className={
                    "p-2 border border-black min-w-[" +
                    getColWidth(cell) +
                    "] cursor-pointer bg-black text-white"
                  }
                >
                  {footerTexts[cell]}
                </div>
              );
            })}
            {allData.tableConfig.AllowEdit && (
              <div
                key={"edt"}
                className={
                  "p-2 border border-black min-w-[" +
                  editColumnWidth +
                  "] cursor-pointer bg-black text-white"
                }
              ></div>
            )}
            <div key={"dummy"} className="min-w-[100px] hidden"></div>
            <div key={"dummy"} className="min-w-[200px] hidden"></div>
          </div>
        )}
      </div>
    </>
  );
};
export default Table;
