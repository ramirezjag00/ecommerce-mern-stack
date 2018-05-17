import React, {Component} from 'react';
import '../app.css';

export default class Hero extends Component {
  render() {
    return (
          <div>
            <img className ="hero-img" src="../../../img/droneHero.jpg" alt="droneHero"/>
          <div className="hero-gradient"></div>
         {/*  <span className="drone-text">Lorem Ipsum :</span>
           <span className="drone-text2">Sample Text</span>*/}
          </div>
    );
  }
}