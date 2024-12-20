import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import Layout from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import WebService from '../../util/webService';
import constant from '../../util/constant';
import { setLoader } from "../../redux/actions/loaderActions";
import { multilanguage } from "redux-multilanguage";
const Store = ({ strings, storeCode, currentLanguageCode, setLoader }) => {
  const [storeDetails, setStoreDetails] = useState();
  const [storeProducts, setStoreProducts] = useState([]);

  useEffect(async () => {
    await getStoreDetails();
    await getStoreProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStoreProducts = async () => {
    setLoader(true)
    let action = constant.ACTION.STORE + "/" + storeCode;
    try {
      let response = await WebService.get(action);
      if (response) {
        console.log(response)
        setStoreDetails(response)
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
    }
  }

  const getStoreDetails = async () => {
    let action = constant.ACTION.PRODUCTS + '?store=' + storeCode;
    try {
      let response = await WebService.get(action);
      if (response) {
        console.log(response)
        setStoreProducts(response)
      }
    } catch (error) {
    }
  }

  return (
    <Fragment>
      {/*<MetaTags>*/}
      {/*  <title>{productDetails && productDetails.description.title}</title>*/}
      {/*  <meta*/}
      {/*    name="description"*/}
      {/*    content={productDetails && productDetails.description.metaDescription}*/}
      {/*  />*/}
      {/*</MetaTags>*/}

      {/*<BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>{strings["Home"]}</BreadcrumbsItem>*/}
      {/*<BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>*/}
      {/*  {productDetails && productDetails.description.name}*/}
      {/*</BreadcrumbsItem>*/}

      {/*<Layout headerContainerClass="container-fluid"*/}
      {/*  headerPaddingClass="header-padding-2"*/}
      {/*  headerTop="visible">*/}
      {/*  /!* breadcrumb *!/*/}
      {/*  <Breadcrumb />*/}

      {/*  /!* product description with image *!/*/}
      {/*  {*/}
      {/*    productDetails &&*/}
      {/*    <ProductImageDescription*/}
      {/*      spaceTopClass="pt-100"*/}
      {/*      spaceBottomClass="pb-100"*/}
      {/*      strings={strings}*/}
      {/*      product={productDetails}*/}
      {/*    />*/}
      {/*  }*/}


      {/*  /!* product description tab *!/*/}
      {/*  {*/}
      {/*    productDetails &&*/}
      {/*    <ProductDescriptionTab*/}
      {/*      spaceBottomClass="pb-90"*/}
      {/*      strings={strings}*/}
      {/*      product={productDetails}*/}
      {/*      review={productReview}*/}
      {/*    />*/}
      {/*  }*/}

      {/*  /!* related product slider *!/*/}
      {/*  /!* <RelatedProductSlider*/}
      {/*    spaceBottomClass="pb-95"*/}
      {/*    category={product.category[0]}*/}
      {/*  /> *!/*/}
      {/*</Layout>*/}
    </Fragment>
  );
};

Store.propTypes = {
  currentLanguageCode: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const store_code = ownProps.match.params.storeCode;
  return {
    storeCode: store_code,
    currentLanguageCode: state.multilanguage.currentLanguageCode,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setLoader: (value) => {
      dispatch(setLoader(value));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(Store));
