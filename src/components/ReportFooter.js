const ReportFooter = (reportData) => {
  return (
    <>
      <div className="footer tr td report-footer-row" key="fr" skm="fr">
        <div
          className="footer-cell tf td eport-footer-first-col"
          key="frfc"
          skm="frfc"
        >
          Total
        </div>
        {reportData?.reportData?.districts?.map((district) => {
          return (
            <div
              className="footer-cell tf td report-footer-cell"
              key={district?.id}
            >
              <span className="fa fa-calendar-check-o footer-data">
                <span> {district?.events}</span>
              </span>
              <span className="fa fa-user footer-data">
                <span> {district?.attendies}</span>
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default ReportFooter;
