import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter, Link} from 'react-router-dom';
import './app.css';
import { Link as LinkSlider} from 'react-scroll';

class Linkbar extends Component {
  state = {
    isOpen: false,
  };

  toggleClass = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  renderContent() {
    //this props is produced by the auth reducer
    switch (this.props.auth) {
      //null is making request to backend to get current user
      case null:
        return;
      //false is request done, user *is not* logged in
      case false:
        return (
          <a href="/auth/google">Login With Google</a>
        );
      //User Model request complete, user is logged in  
      default:
        return (
         <a href="/api/logout">Logout</a>
        );
    }
  }

  render() {
    const element_ul = this.state.isOpen ? "open" : "";
    const element_button = this.state.isOpen ? "open nav-hamburger" : "nav-hamburger";
    const productLink = (this.props.location.pathname === ('/items' || '/')) ? <LinkSlider activeClass="active" to="products" spy={true} smooth={true} offset={50} duration={500} delay={200}>Products</LinkSlider> : <Link to="/items">Products</Link>;
    return (

      <header className='navbar'>
        <div className="navbar-header">
          <a className="nav-logo" href="/items">Bazaar</a>
          <button className={element_button} onClick={this.toggleClass}>
            <span className="nav-stripe"></span>
            <span className="nav-stripe"></span>
            <span className="nav-stripe"></span>
          </button>
        </div>
        <div className="nav-menu">
          <ul className={element_ul}>
            <li key="1"><NavLink to="/items" activeClassName="active">Home</NavLink></li>
          <li key="2" >{productLink}</li>
          <li key="3"><NavLink to="/#" activeClassName="active">FAQ's</NavLink></li>
          <li key="4"><NavLink to="/cart" activeClassName="active">Cart { (this.props.cartItemsNumber > 0)? (<span>{this.props.cartItemsNumber}</span>):('') } <i className="fa fa-shopping-cart" aria-hidden="true"></i></NavLink></li>
          <li key="5">{ this.renderContent() }</li>
          </ul>
        </div>
      </header>
      );
  }
}

function mapStateToProps({auth}) {
  return { auth };
}

// export default connect(mapStateToProps)(withRouter(Linkbar));
export default withRouter(connect(mapStateToProps)(Linkbar));