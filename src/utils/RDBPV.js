import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { GetBaseURL, ProcessTokenProxy } from "../components/Common";
import { DRS_API_WEB_URL, LocationType } from "../constants";

import "../css/master.css";
import "../css/rdbpv.css";

const RDBPV = ({ onLoadComplete, hasData }) => {
  console.log("hasData", hasData);
  const [regions, setRegion] = useState();
  const [districts, setDistrict] = useState();
  const [blocks, setBlock] = useState();
  const [panchayats, setPanchayat] = useState();
  const [villages, setVillage] = useState();
  const [toggleFilterControls, setToggleFilterControls] = useState(false);

  console.log("hasData", hasData);
  if (hasData) $("#filter-control").hide();

  const base = GetBaseURL("DDL");
  const locationId = 1;
  useEffect(() => {
    console.log("RDBPV.useEffect");
    ProcessTokenProxy();

    getDropdownData(LocationType.Region, locationId);

    // if (hasData) {

    //   $("#filter-control").hide();
    // }
  }, []);

  // useEffect(() => {
  //   //$("#filter-control").toggle();
  //   // if (hasData) {
  //   //$("#filter-control").hide();
  //   // }
  // }, [toggleFilterControls]);
  async function getDropdownData(locationTypeId, locationId) {
    //const url = `${base}&locationTypeId=${locationTypeId}&locationId=${locationId}`;
    //const url = `http://drsapi:8880/api/ddl/${locationTypeId}/${locationId}`; //843
    //const url = `http://43.241.70.70/plesk-site-preview/drsapi.mohanbarathi.com/api/ddl/${locationTypeId}/${locationId}`; //843
    //const url = `https://localhost:44326/api/ddl/${locationTypeId}/${locationId}`; //843
    const url = `${DRS_API_WEB_URL}/ddl/${locationTypeId}/${locationId}`; //843
    ProcessTokenProxy();

    const token = localStorage.getItem("token");
    console.log("token", token);
    const tokenData = {
      LocationTypeId: locationTypeId,
      LocationId: locationId,
      Token: token,
    };
    debugger;

    fetch(`${DRS_API_WEB_URL}/ddl`, {
      method: "POST",
      body: JSON.stringify(tokenData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData}`,
      },
    })
      .then((response) => {
        debugger;
        if (response.status !== 200) return response;
        return response.json();
      })
      .then((data) => {
        console.log(data);
        debugger;
        const ddlData = usingAPI
          ? Object.entries(data)?.map((o) => {
              return { id: o[0], name: o[1] };
            })
          : Object.entries(data?.LocationList)?.map((o) => {
              return { id: o[0], name: o[1] };
            });

        ddlData.sort((p1, p2) => {
          if (p1.name < p2.name) return -1;
          if (p1.name > p2.name) return 1;
          return 0;
        });

        switch (locationTypeId) {
          case LocationType.Region:
            setRegion(ddlData);
            ddlData.length > 0 &&
              getDropdownData(LocationType.District, ddlData[0].id);
            break;
          case LocationType.District:
            setDistrict(ddlData);
            ddlData.length > 0 &&
              getDropdownData(LocationType.Block, ddlData[0].id);
            break;
          case LocationType.Block:
            setBlock(ddlData);
            ddlData.length > 0 &&
              getDropdownData(LocationType.Panchayat, ddlData[0].id);
            break;
          case LocationType.Panchayat:
            setPanchayat(ddlData);
            ddlData.length > 0 &&
              getDropdownData(LocationType.Village, ddlData[0].id);
            break;
          case LocationType.Village:
            setVillage(ddlData);
            onLoadComplete(ddlData[0].id);
            break;
        }
        //setAllData(data);
      });
    const usingAPI = true;
    debugger;
    //const url = `http://43.241.70.70/plesk-site-preview/drsapi.mohanbarathi.comapi/ddl/${locationTypeId}/${locationId}`; //843
    //debugger;

    /* fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const ddlData = usingAPI
          ? Object.entries(data)?.map((o) => {
              return { id: o[0], name: o[1] };
            })
          : Object.entries(data?.LocationList)?.map((o) => {
              return { id: o[0], name: o[1] };
            });

        ddlData.sort((p1, p2) => {
          if (p1.name < p2.name) return -1;
          if (p1.name > p2.name) return 1;
          return 0;
        });

        switch (locationTypeId) {
          case LocationType.Region:
            setRegion(ddlData);
            ddlData.length > 0 &&
              getDropdownData(LocationType.District, ddlData[0].id);
            break;
          case LocationType.District:
            setDistrict(ddlData);
            ddlData.length > 0 &&
              getDropdownData(LocationType.Block, ddlData[0].id);
            break;
          case LocationType.Block:
            setBlock(ddlData);
            ddlData.length > 0 &&
              getDropdownData(LocationType.Panchayat, ddlData[0].id);
            break;
          case LocationType.Panchayat:
            setPanchayat(ddlData);
            ddlData.length > 0 &&
              getDropdownData(LocationType.Village, ddlData[0].id);
            break;
          case LocationType.Village:
            setVillage(ddlData);
            onLoadComplete(ddlData[0].id);
            break;
        }
      })
      .catch((error) => {
        debugger;
        //setAllData({ error: error.toString() });
      });*/
  }
  const onChange = (ltid, lid) => {
    getDropdownData(ltid, lid);
  };

  return (
    regions && (
      <>
        <div className="">
          <i
            className="r-filter-custom-button fa fa-plus-circle"
            onClick={(o) => {
              console.log("TODO...");
              $(".rdbpv-container").hide();
              $(".shimmer").hide();
              $(".shimmer-no-animate").hide();
              $(".r-person-container").show();
              $(".r-table-container").hide();
            }}
          ></i>
        </div>
        <div className="r-filter-button">
          <i
            className="fa fa-filter filter-iconxxx"
            onClick={(o) => {
              //setToggleFilterControls(!toggleFilterControls);
              $("#filter-control").toggle();

              if ($("#filter-control").css("display") === "none") {
                $(".r-table-container").css("display", "block");
              } else {
                $(".r-table-container").css("display", "none");
              }
              $(".r-person-container").hide();
              $(".shimmer").show();
              $(".shimmer-no-animate").show();

              // o.preventDefault;
              // debugger;
              // return false;
            }}
          ></i>
        </div>

        <div className="rdbpv-container" id="filter-control">
          <div className="" key="region">
            <Dropdown
              label="Region:"
              id="ddlRegion"
              name="ddlRegion"
              data={regions}
              onChange={(event) => {
                onChange(LocationType.District, event.target.value);
              }}
            />
          </div>
          <div className="" key="district">
            <Dropdown
              label="District:"
              id="ddlDistrict"
              name="ddlDistrict"
              data={districts}
              onChange={(event) => {
                onChange(LocationType.Block, event.target.value);
              }}
            />
          </div>
          <div className="" key="block">
            <Dropdown
              label="Block:"
              id="ddlBlock"
              name="ddlBlock"
              data={blocks}
              onChange={(event) => {
                onChange(LocationType.Panchayat, event.target.value);
              }}
            />
          </div>
          <div className="" key="panchayat">
            <Dropdown
              label="Panchayat:"
              id="ddlPanchayat"
              name="ddlPanchayat"
              data={panchayats}
              onChange={(event) => {
                onChange(LocationType.Village, event.target.value);
              }}
            />
          </div>
          <div className="" key="village">
            <Dropdown
              label="Village:"
              id="ddlVillage"
              name="ddlVillage"
              data={villages}
              onChange={(event) => {
                console.log(event.target.value);
                onLoadComplete(event.target.value);
              }}
            />
          </div>
          <div key="filter">
            <div className="ddl-container btn-apply">
              {/* <input
                type="button"
                name="btnShowReport"
                id="btnShowReport"
                className=""
                value="Apply"
              ></input> */}
            </div>
          </div>
        </div>
      </>
    )
  );
};
export default RDBPV;
