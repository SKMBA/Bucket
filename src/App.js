import React from "react";
import ReactDOM from "react-dom/client";
import Reports from "./components/Reports";
import Devotee from "./components/Devotee";
import PopupTest from "./components/PopupTest";

const root = ReactDOM.createRoot(document.getElementById("root"));
const url = window.location.href;

if (url.indexOf("/Report.aspx") != -1) {
  root.render(<Reports />);
  return;
}

if (url.indexOf("/ReactDevotee.aspx") != -1) {
  root.render(<Devotee />);
  return;
}

if (url.indexOf("/PopupTest.aspx") != -1) {
  root.render(<PopupTest />);
  return;
}

root.render(<div>NO COMPONENT TO LOAD</div>);
