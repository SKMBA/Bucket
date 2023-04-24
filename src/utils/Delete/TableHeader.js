const TableHeader = ({ tr }) => {
  //debugger;
  //const tr = tr;
  //   console.log("Table Header", tr);
  //   tr.tr?.map((o) => {
  //     console.log(o);
  //   });

  //const ar = Object.values(tr); //.map(o=>o.name)
  // debugger;
  return (
    <>
      <div className="tr report-header-row" key="hr">
        <div className="th td report-header-first-col " kdy="hrfc">
          Activity
        </div>
        {tr?.map((td, index) => {
          return (
            <div className={"th td report-header-cell " + td.class} key={index}>
              {td.innerText}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default TableHeader;
