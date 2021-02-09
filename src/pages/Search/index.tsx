import React, { useState, useEffect } from "react";
import { RouteComponentProps, useParams, useLocation } from "react-router-dom";
import { Header, Footer, FilterArea, ProductList } from "../../components/"
import styles from "./style.module.scss";
import { Spin } from "antd";
import { searchProduct } from "../../redux/productSearch/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
interface MatchParams {
    keyWords: string;
}

export const SearchPage: React.FC<RouteComponentProps<MatchParams>> = () => {
    const { keyWords } = useParams<MatchParams>()
    const loading = useSelector((state) => state.productSearch.loading);
    const error = useSelector((s) => s.productSearch.error);
    const pagination = useSelector((s) => s.productSearch.pagination);
    const productList = useSelector((s) => s.productSearch.data);

    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        dispatch(searchProduct({ nextPage: 1, pageSize: 10, keyWords }))
    },[location])
    const onChangeFn = (nextPage, pageSize) => {
        console.log(121212)
        dispatch(searchProduct({ nextPage, pageSize, keyWords }))
    }
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
        <div>
            <Header></Header>
            {/* 分类过滤器 */}
            <div className={styles["page-content"]}>
                <FilterArea
                ></FilterArea>
            </div>
            {/* 产品列表 */}
            <div className={styles["product-list-container"]}>
                <ProductList
                    data={productList}
                    paging={pagination}
                    onPageChange={onChangeFn}
                >

                </ProductList>
            </div>
            <Footer></Footer>
        </div>
    )
}
