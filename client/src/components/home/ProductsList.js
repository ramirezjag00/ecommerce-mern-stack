import React, {Component} from 'react';
import '../app.css';
// import * as Scroll from 'react-scroll';
import {Element} from 'react-scroll';
import ItemList from '../pages/itemsList';

export default class ProductsList extends Component {
  render() {
    return (
          <div className="products-list-container">
            <Element className="products-list-title" name="products">Products</Element>
            <div>
            <ItemList />
            </div>
          </div>
    );
  }
}