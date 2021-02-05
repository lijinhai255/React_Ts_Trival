import React from 'react';
import logo from './logo.svg';
import styles from "./App.module.css";
import {Input, Layout,Typography,Menu,Dropdown,Button} from "antd"
import { GlobalOutlined } from "@ant-design/icons";
import {Header,Footer} from "./components"
function App() {
  return (
    <div className={styles.App}>
     <Header></Header>
    <Footer></Footer>
    </div>
  );
}

export default App;
