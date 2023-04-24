import { useEffect, useState } from "react";

const useAPI = (url) => {
  const [data, setData] = useState(null);
  console.log(url);
  if (url === "") return null;
  debugger;
  useEffect(() => {
    fetch(url.url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return data;
};
export default useAPI;
