import React, { useState } from 'react';

interface Props {
  onEnterPressed: (id: string) => void;
}

export default function SearchBox(props: Props) {
  const [searchValue, updateSearchValue] = useState('');

  const onSearchBarChanged = (value: string) => {
    updateSearchValue(value);
  }

  const onSearchBarKeyPressed = (keyName: string) => {
    if (keyName === 'Enter' && searchValue != null) {
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