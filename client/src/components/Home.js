import React from 'react';
import Hero from './home/Hero';
import Hero2 from './home/Hero2';
import Icon from './home/Icon';
import ProductsList from './home/ProductsList';
import './app.css';

export default () =>
  (
    <div>
      <Hero />
      <Hero2 />
      <Icon />
      <ProductsList />
    </div>
  );
