import { useState } from "react";
import Popup from "../utils/Popup";
//https://www.w3schools.com/howto/howto_css_modals.asp
//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
const PopupTest = () => {
  const [update, setUpdate] = useState(false);
  function test() {
    $("#myModal").css("display", "block");

    console.log("tested");

    setUpdate(!update);
  }

  $("#close").click(function () {
    $("#myModal").css("display", "none");
  });

  return (
    <>
      <div className="pc">
        <input
          type="button"
          name="btnShowPopup"
          id="btnShowPopup"
          className="pbutton"
          onClick={() => {
            test();
          }}
          value="Apply"
        ></input>
      </div>
      <Popup />
    </>
  );
};
export default PopupTest;
