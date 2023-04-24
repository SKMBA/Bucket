const ReportHeader = (reportData) => {
  return (
    <>
      <div className="header tr report-header-row" key="hr">
        <div className="header-cell th td report-header-first-col" kdy="hrfc">
          <span>Activity</span>
        </div>
        {reportData?.reportData?.districts?.map((district) => {
          return (
            <div
              className="header-cell th td report-header-cell"
              key={district?.id}
            >
              <span> {district?.name}</span>
              {/* ({district.id}) <br></br>Att:{district.attendies}Evt:{district.events} */}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default ReportHeader;
