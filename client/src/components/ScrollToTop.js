import React, { Component } from 'react';
// import * as Scroll from 'react-scroll';
import { animateScroll as scroll } from 'react-scroll';
import './app.css';

export default class ScrollToTop extends Component {
  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  scrollToTop() {
    scroll.scrollToTop();
  }
  render() {
    return (
      <div className="scroll-to-top-container">
        <button onClick={this.scrollToTop} id="btn-to-top"><i className="fa fa-angle-up"></i></button>
      </div>
    );
  }
}

