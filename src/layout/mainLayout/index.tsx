import React from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import styles from "./style.module.scss";
import { Header, Footer } from "../../components";

export const MainLayout: React.FC = ({ children }) => {
    return (
      <>
        <Header />
        {/* 页面内容 content */}
        <div className={styles["page-content"]}>{children}</div>
        <Footer />
      </>
    );
  };