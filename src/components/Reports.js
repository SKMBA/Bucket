import { useEffect, useState } from "react";
import {
  DRS_WEB_HANDLER_URL,
  DevoteeData,
  HTTPstatus,
  HTTPstatusText,
  LOCAL_WEB_HANDLER_URL,
  reportData,
} from "../constants";
import ReportHeader from "./ReportHeader";
import ReportBody from "./ReportBody";
import ReportFooter from "./ReportFooter";
import Shimmer from "../utils/Shimmer";
import ReportFilter from "./ReportFilter";
import ReportShimmerNoAnimate from "../utils/ShimmerNoAnimate";
import { GetBaseURL } from "./Common";
import Table from "../utils/Table";
import "./../../index.css";

const Reports = () => {
  const now = new Date();
  const [report, setReport] = useState([]);
  const [regions, setRegions] = useState(reportData.regions);
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [regionId, setRegionId] = useState(-1);
  const [shimmerStauts, setShimmerStauts] = useState(HTTPstatus.Waiting);

  useEffect(() => {
    setRegions(reportData.regions);
    setRegionId($(regions).first().attr("id"));
    //setTimeout(() => {
    //debugger;

    const mm = parseInt($("#ddlMonth").val());
    const yyyy = $("#ddlYear").val();
    const rId = $("#ddlRegion").val();
    //$("#ddlRegion option[value='" + rId + "']").prop("selected", true);

    getReport(rId, yyyy, mm);
    //setReport(DevoteeData);

    //}, 2000);
  }, []);

  async function getReport(rId, yyyy, mm) {
    const base = GetBaseURL("Report");
    const initialCall = isNaN(rId);
    const url = initialCall
      ? base
      : `${base}&regionid=${rId}&month=${isNaN(mm) ? mm : mm + 1}&year=${yyyy}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.ErrorCode !== HTTPstatus.OK) {
          setShimmerStauts(data.ErrorCode);
          return;
        }

        if (data?.districts?.length === 0) {
          setShimmerStauts(HTTPstatus.NoContent);
          return;
        }

        let totEventsOrAttendies = 0;
        data?.districts?.forEach((o) => {
          totEventsOrAttendies = totEventsOrAttendies + o.events + o.attendies;
        });

        if (totEventsOrAttendies === 0) {
          setShimmerStauts(HTTPstatus.NoContent);
          return;
        }

        setReport(data);
        if (data?.regions) {
          setRegions(data.regions);
        }
        setShimmerStauts(HTTPstatus.OK);
      });
    setShimmerStauts(HTTPstatus.Loading);
  }

  function filterButtonClickHandler(rId, yyyy, mm) {
    setMonth(mm);
    setYear(yyyy);
    setRegionId(rId);
    setReport([]);
    getReport(rId, yyyy, mm);
  }
  let animate = false;
  let message = "";
  switch (shimmerStauts) {
    case HTTPstatus.Waiting:
      animate = true;
      message = HTTPstatusText.Waiting;
      break;
    case HTTPstatus.Loading:
      animate = true;
      message = HTTPstatusText.Loading;
      break;
    case HTTPstatus.OK:
      message = HTTPstatusText.Success;
      break;
    case HTTPstatus.NoContent:
      message =
        "No records in " +
        $("#ddlRegion option:selected").text() +
        " for " +
        $("#ddlMonth option:selected").text() +
        " " +
        $("#ddlYear option:selected").text();
      break;
    case HTTPstatus.Unauthorized:
      message = HTTPstatusText.Unauthorized;
      let count = 1000;
      setInterval(() => {}, 100);
      setTimeout(() => {
        window.location.href = "Logout.aspx";
      }, 3000);
      break;
    case HTTPstatus.NOTLOGGEDIN:
      message = HTTPstatusText.NOTLOGGEDIN;

      break;
    default:
      message = HTTPstatusText.UnknownError;
      break;
  }

  return shimmerStauts === HTTPstatus.OK ? (
    <>
      <ReportFilter
        dropdownData={regions}
        filterButtonClickHandler={filterButtonClickHandler}
        defaultRegionId={regionId}
        defaultMonth={month}
        defaultYear={year}
      />

      <div className="rep-table rep-table-old-version">
        <div className="rep-table-body report-table">
          <ReportHeader reportData={report} />
          <ReportBody reportData={report} />
          <ReportFooter reportData={report} />
        </div>
      </div>
    </>
  ) : (
    <>
      {animate ? (
        <Shimmer message={message} />
      ) : (
        <ReportShimmerNoAnimate message={message} />
      )}

      <ReportFilter
        dropdownData={regions}
        filterButtonClickHandler={filterButtonClickHandler}
        defaultRegionId={regionId}
        defaultMonth={month}
        defaultYear={year}
      />
    </>
  );

  //https://blog.logrocket.com/react-onclick-event-handlers-guide/#custom-components-events-react
};
export default Reports;
