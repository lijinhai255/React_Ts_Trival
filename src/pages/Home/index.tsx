import React, { Component } from 'react'
import logo from './logo.svg';
import { Input, Layout, Typography, Menu, Dropdown, Button, Row, Col, Spin } from "antd"
import { Header, Footer, SideMenu, Carousel, ProductCollection, BusinessPartners } from "../../components"
import { productList1, productList2, productList3 } from "./mockups";
import sideImage from '../../assets/images/sider_2019_12-09.png';
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';
import styles from './style.module.scss'
import { withTranslation, WithTranslation } from 'react-i18next'
//  引入axios
import axios from 'axios'
// connect 
import { connect } from 'react-redux'
import { RootState } from "../../redux/store";
import {
  fetchRecommendProductStartAction,
  fetchRecommendProductSuccessAction,
  fetchRecommendProductFailAction
} from "../../redux/recommendProducts/recommendProductsActions"
const mapStateToProps = (state: RootState) => {
  console.log(state,"state-state")
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchStart: () => {
      dispatch(fetchRecommendProductStartAction())
    },
    fetchSuccess: (data) => {
      dispatch(fetchRecommendProductSuccessAction(data))
    },
    fetchFill: (error) => {
      dispatch(fetchRecommendProductFailAction(error))

    }
  }

}
type PropsType = WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>
class HomePageComponent extends Component<PropsType> {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     loading: true,
  //     error: null,
  //     productList: []
  //   }
  // }
  async componentDidMount() {
    this.props.fetchStart()
    try {
      const { data } = await axios.get(
        "http://123.56.149.216:8080/api/productCollections"
      );
      this.props.fetchSuccess(data)
    } catch (error) {
      this.props.fetchFail(error.message)
    }
  }
  render() {
    const { productList, loading, error,t } = this.props ;
    console.log(this.props, 1)
    // const { t } = this.props;
    if (loading) {
      return (
        <Spin
          size="large"
          style={{
            marginTop: 200,
            marginBottom: 200,
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
          }}
        />
      );
    }
    if (error) {
      return <div>网站出错：{error}</div>;
    }
    return (
      <>
        <Header />
        {/* 页面内容 content */}
        <div className={styles["page-content"]}>
          <Row style={{ marginTop: 20 }}>
            <Col span={6}>
              <SideMenu />
            </Col>
            <Col span={18}>
              <Carousel />
            </Col>
          </Row>
          {/* <ProductCollection
            title={
              <Typography.Title level={3} type="warning">
                {t("home_page.hot_recommended")}
              </Typography.Title>
            }
            sideImage={sideImage}
            products={productList[0].touristRoutes}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="danger">
                {t("home_page.new_arrival")}
              </Typography.Title>
            }
            sideImage={sideImage2}
            products={productList[1].touristRoutes}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="success">
                {t("home_page.domestic_travel")}
              </Typography.Title>
            }
            sideImage={sideImage3}
            products={productList[2].touristRoutes}
          />
          <BusinessPartners /> */}
        </div>
        <Footer />
      </>
    )
  }
}
// @connect()
// withTranslation()(HomePageComponent, mapStateToProps, mapDispatchToProps)
export const Home = connect(mapStateToProps,mapDispatchToProps)(withTranslation()(HomePageComponent))