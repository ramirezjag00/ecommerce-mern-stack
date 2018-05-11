import React, { Component } from 'react';
import Slider from "react-slick";
import '../app.css';

export default class Carousel extends React.Component {
  render() {
    const settings = {
      autoplay: true,
      dots: true,
      lazyLoad: true,
      infinite: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,   
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    };
    return (
      <div className="_slider-container">
        <Slider {...settings}>
          <div>
            <img className ="slider-img" src="../../../img/dd1.jpg" />
          </div>
          <div>
            <img className ="slider-img" src="../../../img/dd2.jpg" />
          </div>
          <div>
            <img className ="slider-img" src="../../../img/dd3.jpg" />
          </div>
        </Slider>
      </div>
    );
  }
}