const TableBody = ({ activities }) => {
  return (
    <>
      {activities?.map((activity) => {
        return (
          <div className="tr report-body-row" key={activity?.id}>
            <div className="td report-body-first-col" key="ff" skm="ff">
              {activity.name}
            </div>
            {activity?.districts?.map((district) => {
              return (
                <div className="td report-body-cell" key={district?.id}>
                  {district?.e > 0 ? district?.e : ""}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default TableBody;
