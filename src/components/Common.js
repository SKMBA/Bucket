import { LOCAL_WEB_HANDLER_URL } from "../constants";

export const GetBaseURL = (mode) => {
  const apilink =
    "http://43.241.70.70/plesk-site-preview/drsapi.mohanbarathi.com/api/";
  const base =
    window.location.href.indexOf("localhost:1234") != -1
      ? "http://drsdemo:8080/DRSHandler.ashx"
      : LOCAL_WEB_HANDLER_URL;

  const userId = $("#hdnUserId").val();
  const url = `${base}?mode=${mode}&loggedinuserid=${userId}`;
  return url;
};

export const ProcessTokenProxy = () => {
  if ($("#hdnIsR_Registered").val() !== "")
    localStorage.setItem("token", $("#hdnIsR_Registered").val());
  console.log($("#hdnIsR_Registered").val());
  $("#hdnIsR_Registered").val("");
};
