import React from 'react';
import { Link } from 'react-router-dom';
import '../app.css';

export default () =>
  (
    <div className="icon-container">
      <div className="icon-flex">
        <div>
          <Link className="icon-link" to="#">
            <img className="icon-img" src="../../../img/drone_front.svg" alt="drone_front" />
            <p>Lorem Ipsum</p>
          </Link>
        </div>
        <div>
          <Link className="icon-link" to="#">
            <img className="icon-img" src="../../../img/drone_propeller.svg" alt="drone_propeller" />
            <p>Lorem Ipsum</p>
          </Link>
        </div>
        <div>
          <Link className="icon-link" to="#">
            <img className="icon-img" src="../../../img/drone_control.svg" alt="drone_control" />
            <p>Lorem Ipsum</p>
          </Link>
        </div>
        <div>
           <Link className="icon-link" to="#">
             <img className="icon-img" src="../../../img/drone_location.svg" alt="drone_location" />
             <p>Lorem Ipsum</p>
           </Link>
        </div>
      </div>
    </div>
  );
