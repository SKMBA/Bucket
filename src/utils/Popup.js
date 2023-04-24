import "../css/test.css";

import MonthDropdown from "./MonthDropdown";
const Popup = () => {
  return (
    <>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span id="close" class="close">
            &times;
          </span>
          <p>Some text in the Modal..</p>
        </div>
      </div>
    </>
  );
};
export default Popup;
