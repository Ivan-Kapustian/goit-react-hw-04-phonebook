import React from 'react';

const Filter = ({ filter, change }) => {
  return (
    <label>
      Find contacts by name
      <input type="text" value={filter} onChange={change} />
    </label>
  );
};

export default Filter;
