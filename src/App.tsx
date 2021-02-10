import styles from "./App.module.css";
import React,{useEffect} from "react"
import { BrowserRouter, Route, Switch ,Redirect} from "react-router-dom"
import { Home,Login,RegisterPage,DetailPage,SearchPage,ShoppingCartPage} from "./pages/index"
import {useSelector} from "./redux/hooks"
import {useDispatch} from "react-redux"
import {getShoppingCar} from "./redux/shoppingCart/slice"
const PrivateRoute = ({component,isLoagin,...rest}) =>{
  const routeComponents = (props)=>{
   return isLoagin?React.createElement(component,props):
    <Redirect to={{pathname:"/login"}}></Redirect>
  }
  return <Route render={routeComponents} {...rest}></Route>
}
function App() {
  const jwt = useSelector((s)=>s.user.token)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(jwt){
      dispatch(getShoppingCar(jwt))
    }
  },[jwt])
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login"  component={Login}></Route>
          <Route path="/register"  component={RegisterPage}></Route>
          <Route path="/detail/:touristRouteId" component={DetailPage} />
          <Route path="/search/:keyWords" component={SearchPage} />
          <PrivateRoute 
          isLoagin ={jwt!==null}
          path="/shoppingCart" 
          component={ShoppingCartPage} ></PrivateRoute>
          <Route render={() => <h1>404 not found 页面没有找到</h1>}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
