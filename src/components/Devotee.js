import { useEffect, useState } from "react";
import Table from "../utils/Table";
import { GetBaseURL, ProcessTokenProxy } from "./Common";
import RDBPV from "../utils/RDBPV";
import { DRS_API_LOCAL_URL, DRS_API_WEB_URL, DevoteeData } from "../constants";
import Person from "../utils/Person";

const Devotee = () => {
  const [allData, setAllData] = useState();
  function testauth() {
    const aurl = `${DRS_API_WEB_URL}/auth/login`;
    const data = {
      mobile: "9841133266",
      password: "xr9rcwuh",
    };

    fetch(aurl, {
      method: "POST",
      body: JSON.stringify(data),

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
        //setAllData(data);
      });

    // fetch(aurl, {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    // })
    //   .then((response, a, b) => {
    //     debugger;
    //     console.log(response.text);
    //     return response.text;
    //     return response.json();
    //   })
    //   .then((data, a, b) => {
    //     debugger;
    //     console.log(data);
    //     const accessToken = data.access_token;
    //     //const refreshToken = data.refresh_token;
    //   })
    //   .catch((error, a, b) => {
    //     debugger;
    //     console.error(error);
    //   });
  }
  useEffect(() => {
    console.log("Devotee.useEffect");
    debugger;
    ProcessTokenProxy();
    //localStorage.setItem("token", $("#hdnIsR_Registered").val());
    //$("#hdnIsR_Registered").val("");
    //testauth();
  }, []);

  async function getDevoteeData(villageId) {
    //const url = `http://drsapi:8880/api/devotee/${villageId}`; //843
    //const url = `http://43.241.70.70/plesk-site-preview/drsapi.mohanbarathi.com/api/devotee/${villageId}`;
    const url = `${DRS_API_WEB_URL}/devotee/${villageId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAllData(data);
      })
      .catch((error) => {
        setAllData({ error: error.toString() });
      });
  }
  function onLoadComplete(villageId) {
    setAllData(null);

    getDevoteeData(villageId);
  }
  // console.log("allData", allData);
  // console.log("DevoteeData", DevoteeData);
  return (
    <>
      <RDBPV
        onLoadComplete={onLoadComplete}
        hasData={allData?.data?.length > 0}
      />
      <Table {...allData} />
      <div className="r-person-container">
        <Person />
      </div>
      {/* <RDBPV onLoadComplete={onLoadComplete} /> */}
    </>
  );
};

export default Devotee;
