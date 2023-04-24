import { useEffect, useState } from "react";
import "../css/devotee.css";

const Person = () => {
  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

  useEffect(() => {
    $(".r-person-container").hide().css("display", "none");
  }, []);
  const handleAddClick = () => {
    setInputList([...inputList, { firstName: "", lastName: "" }]);
  };

  return (
    <>
      {inputList.map((x, i) => {
        return (
          <div key={x + i} className="box">
            {/* <input name="firstName" value={x.firstName} /> */}
            <div key="dn" className="devotee-name">
              <div>Name:</div>
              <div>
                <input
                  name="firstName"
                  // value={x.firstName}
                  type="text"
                  // id="txtDevoteeName"
                  className="   "
                  // autocomplete="off"
                ></input>
              </div>
            </div>
            {/* <input className="ml10" name="lastName" value={x.lastName} /> */}

            <div key="dm" className="devotee-mobile">
              <div>Mobile:</div>
              <div>
                <input
                  name="lastName"
                  // value={x.lastName}
                  type="text"
                  //id="txtDevoteeMobile"
                  className="  first-letter:"
                  // autocomplete="off"
                ></input>
              </div>
            </div>

            {/* <div className="btn-box">
              {inputList.length !== 1 && (
                <button className="mr10">Remove</button>
              )}
              {inputList.length - 1 === i && <button>Add</button>}
            </div> */}
          </div>
        );
      })}
      <input type="button" value="add" onClick={handleAddClick}></input>

      {/* <div className="">
        <i
          className="r-filter-custom-button fa fa-plus-circle"
          onClick={(o) => {
            console.log("TODO...");
            handleAddClick();
          }}
        ></i>
      </div> */}
      <div className="devotee-popup-container">
        <div className="devotee-popup">
          <div className="devotee-name">
            <div>Name:</div>
            <div>
              <input
                name="txtDevoteeName"
                type="text"
                id="txtDevoteeName"
                className="   "
                // autocomplete="off"
              ></input>
            </div>
          </div>
          <div className="devotee-mobile">
            <div>Mobile:</div>
            <div>
              <input
                name="txtDevoteeMobile"
                type="text"
                id="txtDevoteeMobile"
                className="  first-letter:"
                // autocomplete="off"
              ></input>
            </div>
          </div>
          <div className="add">
            <span
              onClick={() => {
                handleAddClick();
              }}
            >
              +
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Person;
