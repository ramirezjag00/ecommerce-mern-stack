import React from 'react';
// import * as Scroll from 'react-scroll';
import { Element } from 'react-scroll';
import '../app.css';
import ItemList from '../pages/itemsList';

export default () =>
  (
    <div className="products-list-container">
      <Element className="products-list-title" name="products">Products</Element>
      <div>
        <ItemList />
      </div>
    </div>
  );
