import React from 'react';

export class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchValue: null };
    this.onSearchBarChanged = this.onSearchBarChanged.bind(this);
    this.onSearchBarKeyPressed = this.onSearchBarKeyPressed.bind(this);
  }

  onSearchBarChanged(value) {
    this.setState({ searchValue: value });
  }

  onSearchBarKeyPressed(keyName) {
    if (keyName == 'Enter' && this.state.searchValue != null) {
      this.props.onEnterPressed(this.state.searchValue);
    }
  }

  render() {
    return (
      <div>
        <input
          className="form-control"
          style={{width: "50%", display: "block"}}
          placeholder="Search..."
          type="search"
          onChange={(event) => this.onSearchBarChanged(event.target.value)}
          onKeyPress={(event) => this.onSearchBarKeyPressed(event.key)}/>
      </div>
    );
  }
}