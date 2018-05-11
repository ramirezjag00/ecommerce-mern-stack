import React, { Component } from 'react';
import '../app.css';


class SearchBox extends Component {
 

  render() {

    return (
      <div className="search-background">
        <form className="form-search" action="#" method="GET">
          <input type="text" className="form-input-search" name="search" placeholder="Search item name..."/>
          <button className="btn-search" type="submit">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </form>
      </div>
      );
  }
}

export default SearchBox;
