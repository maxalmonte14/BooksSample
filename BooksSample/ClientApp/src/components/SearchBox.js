import React, { useState } from 'react';

export default function SearchBox(props) {
  const [searchValue, updateSearchValue] = useState('');

  function onSearchBarChanged(value) {
    updateSearchValue(value);
  }

  function onSearchBarKeyPressed(keyName) {
    if (keyName == 'Enter' && searchValue != null) {
      props.onEnterPressed(searchValue);
    }
  }

  return (
    <div>
      <input
        className="form-control"
        style={{width: "50%", display: "block"}}
        placeholder="Search..."
        type="search"
        onChange={(event) => onSearchBarChanged(event.target.value)}
        onKeyPress={(event) => onSearchBarKeyPressed(event.key)}/>
    </div>
  );
}