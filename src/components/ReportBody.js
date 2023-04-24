const ReportBody = (reportData) => {
  return (
    <>
      {reportData?.reportData?.activities?.map((activity) => {
        return (
          <div className="body tr report-body-row" key={activity?.id}>
            <div
              className="body-cell td report-body-first-col"
              key="ff"
              skm="ff"
            >
              {activity.name}
            </div>
            {activity?.districts?.map((district) => {
              return (
                <div
                  className="body-cell td report-body-cell"
                  key={district?.id}
                >
                  {district?.e > 0 ? district?.e : ""}
                  {/* {district.events > 0}
                  {district.events} */}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

// const ReportBodyOld = () => {
//   return (
//     <>
//       {reportData.events.map((event) => {
//         return (
//           <div className="report-header-container">
//             <div className="report-header-cell">{event.name}</div>
//             {event?.scores?.map((o) => {
//               return (
//                 <>
//                   <div className="report-header-cell">
//                     ({o.id}){o.count}
//                   </div>
//                 </>
//               );
//             })}
//           </div>
//         );
//       })}
//     </>
//   );
// };

export default ReportBody;
