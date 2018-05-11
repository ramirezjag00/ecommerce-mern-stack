import React, {Component} from 'react';
import '../app.css';
// import * as Scroll from 'react-scroll';
import {Element} from 'react-scroll';
import ItemList from '../item/ItemList';

export default class ProductsList extends Component {
  render() {
    return (
          <div className="products-list-container">
            <Element className="products-list-title" name="products">Products</Element>
            <div className="products-list-flex">
            <ItemList />
              {/*<div className="item-container orange">
                <img src="../../../img/p1.jpg" alt="p1" />
                <i className="fa fa-eye" aria-hidden="true"></i>
                <p>Inspire Lite 58 Parachute System</p>
                <button>Add to Cart</button>
              </div>
              <div className="item-container orange">
                <img src="../../../img/p2.jpg" alt="p2" />
                <i className="fa fa-eye" aria-hidden="true"></i>
                <p>Phantom P4 Lite</p>
                <button>Add to Cart</button>
              </div>
              <div className="item-container orange">
                <img src="../../../img/p3.jpg" alt="p3" />
                <i className="fa fa-eye" aria-hidden="true"></i>
                <p>Solo Lite Parachute System</p>
                <button>Add to Cart</button>
              </div>*/}
            </div>
          </div>
    );
  }
}