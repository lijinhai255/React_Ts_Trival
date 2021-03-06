import React, { useState, useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import axios from "axios";
import { Spin, Row, Col, DatePicker, Divider, Typography, Anchor, Menu,Button } from "antd";
import styles from "./style.module.scss"
// 引入 header 组件 
import { Header, Footer, ProductIntro, ProductComments } from "../../components/"
// 引入产品组件 类型
import { PropsType } from "../../components/productIntro"
import { commentMockData } from "./mockup";
// 引入 redux
import { ProductDetailSlice, getProductDetail } from "../../redux/productDetail/slice"
import { useSelector } from "../../redux/hooks"
import { useDispatch } from "react-redux"
import { MainLayout } from "../../layout/mainLayout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {addShoppingCar} from "../../redux/shoppingCart/slice"
interface MatchParams {
  touristRouteId: string;
}

const { RangePicker } = DatePicker;
export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (
  props
) => {
  const { touristRouteId } = useParams<MatchParams>()
  // const [loading, setLoading] = useState<boolean>(false)
  // const [product, setProduct] = useState<any>()
  // const [error, serError] = useState<string | null>(null)
  const loading = useSelector(state => state.productsDetail.loading)
  const error = useSelector(state => state.productsDetail.error)
  const product = useSelector(state => state.productsDetail.data)
  const dispatch = useDispatch()
  // 获取jwt
  const jwt = useSelector(state =>state.user.token) as string;
  const shoppingCartLoading = useSelector(state => state.shoppingCart.loading)
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getProductDetail(touristRouteId))
    }
    fetchData()
  }, [])
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
      <MainLayout>
        {product && <div className={styles['page-content']}>
          {/* 产品介绍 与 日期组件 */}
          <div className={styles['product-intro-container']}>
            <Row>
              <Col span={13}>
                {<ProductIntro
                  title={product.title}
                  shortDescription={product.description}
                  price={product.originalPrice}
                  coupons={product.coupons}
                  points={product.points}
                  discount={product.price}
                  rating={product.rating}
                  pictures={product.touristRoutePictures.map((p) => p.url)}
                ></ProductIntro>}

              </Col>
              <Col span={11}>
                <Button
                  style={{
                    marginTop:50,
                    marginBottom:30,
                    display: 'block',
                  }}
                  danger
                  loading={shoppingCartLoading}
                  onClick={()=>{
                    dispatch(addShoppingCar({
                      jwt,
                      touristRouteId:product.id
                    }))
                  }}
                >
                  <ShoppingCartOutlined/>
                  添加购物车
                </Button>
                <RangePicker open style={{ marginTop: 20 }} />
              </Col>
              <Col></Col>
            </Row>
          </div>
          {/* 锚点菜单 */}
          <div className={styles["product-detail-anchor"]}>
            <Anchor className={styles["product-detail-anchor"]}>
              <Menu mode="horizontal">
                <Menu.Item key="1">
                  <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Anchor.Link href="#fees" title="费用"></Anchor.Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Anchor.Link href="#notes" title="预订须知"></Anchor.Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
                </Menu.Item>
              </Menu>
            </Anchor>
          </div>
          {/* 产品特色 */}
          <div id="feature" className={styles["product-detail-container"]}>
            <Divider orientation={"center"}>
              <Typography.Title level={3}>产品特色</Typography.Title>
            </Divider>
            <div
              dangerouslySetInnerHTML={{ __html: product.features }}
              style={{ margin: 50 }}
            ></div>
          </div>
          {/* 费用 */}
          <div id="fees" className={styles["product-detail-container"]}>
            <Divider orientation={"center"}>
              <Typography.Title level={3}>费用</Typography.Title>
            </Divider>
            <div
              dangerouslySetInnerHTML={{ __html: product.fees }}
              style={{ margin: 50 }}
            ></div>
          </div>
          {/* 预订须知 */}
          <div id="notes" className={styles["product-detail-container"]}>
            <Divider orientation={"center"}>
              <Typography.Title level={3}>预定须知</Typography.Title>
            </Divider>
            <div
              dangerouslySetInnerHTML={{ __html: product.notes }}
              style={{ margin: 50 }}
            ></div>
          </div>
          {/* 商品评价*/}
          <div id="comments" className={styles["product-detail-container"]}>
            <Divider orientation={"center"}>
              <Typography.Title level={3}>用户评价</Typography.Title>
            </Divider>
            <div style={{ margin: 40 }}>
              <ProductComments
                data={commentMockData}
              />
            </div>
          </div>
        </div>
        }
      </MainLayout>

    </>
  );
};
