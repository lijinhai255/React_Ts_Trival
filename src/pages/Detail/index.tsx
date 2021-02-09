import React, { useState, useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import axios from "axios";
import { Spin,Row,Col,DatePicker } from "antd";
import styles from "./style.module.scss"
// 引入 header 组件 
import { Header,Footer,ProductIntro } from "../../components/"
// 引入产品组件 类型
import  { PropsType } from "../../components/productIntro"
interface MatchParams {
  touristRouteId: string;
}

const { RangePicker } = DatePicker;
export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (
  props
) => {
  const { touristRouteId } = useParams<MatchParams>()
  const [loading, setLoading] = useState<boolean>(false)
  const [product, setProduct] = useState<any>()
  const [error, serError] = useState<string | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
        // console.log(data, "data")
        setProduct(data)
        setLoading(false)
      } catch (error) {
        serError(error.message)
        setLoading(false)
      }
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
      <Header></Header>
      <div className={styles['page-content']}>
        {/* 产品介绍 与 日期组件 */}
        <div className={styles['product-intro-container']}>
          <Row>
            <Col span={13}>
             {product&&<ProductIntro
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
            <RangePicker open style={{ marginTop: 20 }} />
            </Col>
            <Col></Col>
          </Row>
        </div>
        {/* 锚点菜单 */}
        <div className={styles["product-detail-anchor"]}></div>
        {/* 产品特色 */}
        <div id="feature" className={styles["product-detail-container"]}></div>
        {/* 费用 */}
        <div id="fees" className={styles["product-detail-container"]}></div>
        {/* 预订须知 */}
        <div id="notes" className={styles["product-detail-container"]}></div>
        {/* 商品评价*/}
        <div id="comments" className={styles["product-detail-container"]}></div>
      </div>
      <Footer></Footer>
    </>
  );
};
