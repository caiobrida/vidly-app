import React from "react";

const DropDown = ({ name, label, error, fields, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control" {...rest} id={name} name={name}>
        <option value="" />
        {fields.map(f => (
          <option value={f._id} key={f._id}>
            {f.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default DropDown;
