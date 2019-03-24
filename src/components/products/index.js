import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchProducts } from "../../actions/products";
import { Loading } from "../../common";
import ProductsItem from "./productItems";
import ProductForm from "./productForm.js";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addEvent: false,
      editId: 0,
      deleteItem: null,
      action: ""
    };
  }
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const {
      products: { isFetching, productItems }
    } = this.props;

    if (isFetching) {
      return <Loading />;
    }

    return (
      <div className="collapse" id="products">
        <div id="productlist">
          {productItems.map((item, i) => (
            <ProductsItem key={i} item={item} />
          ))}
        </div>
        <ProductForm />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    products: state.products
  };
}

Products.propTypes = {
  fetchProducts: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { fetchProducts }
)(Products);
