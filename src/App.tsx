import styles from "./App.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Home,Login,RegisterPage,DetailPage,SearchPage} from "./pages/index"
function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login"  component={Login}></Route>
          <Route path="/register"  component={RegisterPage}></Route>
          <Route path="/detail/:touristRouteId" component={DetailPage} />
          <Route path="/search/:keyWords" component={SearchPage} />
          <Route render={() => <h1>404 not found 页面没有找到</h1>}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
