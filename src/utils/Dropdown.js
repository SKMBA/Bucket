const Dropdown = ({ label, id, name, data, onChange }) => {
  return (
    <>
      <div key={"dd-Container-" + id} className={"ddl-container"}>
        <label key={"dd-Container-label" + id} className={"ddl-label"}>
          {label}
        </label>
        <select key={id} id={id} name={name} onChange={onChange}>
          {data?.map((o, index) => {
            return (
              <option key={index} value={o.id}>
                {o.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};
export default Dropdown;
