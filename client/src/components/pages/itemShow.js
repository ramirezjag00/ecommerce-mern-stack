import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchItem } from '../../actions/itemsActions';


class ItemShow extends Component {
  componentDidMount() {
  // for network purposes, if the item isn't loaded yet on the browser, load it
    if (!this.props.item) {
      const { id } = this.props.match.params;
      // console.log(this.props);
      this.props.fetchItem(id);
    }
  }

  render() {
    // this.props === ownProps
    const { item } = this.props;
    // console.log(this.props.item);
    if (!item) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>{item.title}</h3>
        <h3>{item.description}</h3>
        <h3>{item.images}</h3>
        <h3>{item.price}</h3>
      </div>
    );
  }
}
function mapStateToProps({ items }, ownProps) {
  return { item: items[ownProps.match.params.id] };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchItem,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemShow);
