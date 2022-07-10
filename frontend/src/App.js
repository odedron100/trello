import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import './assets/styles/main.scss'
// import { currBackgroundImg } from './store/actions/BoardActions'
import { HomePage } from "./views/HomePage/HomePage";
import { AppHeader } from "./cmps/AppHeader/AppHeader"
import { useState } from "react";
import { BoardDetails } from "./cmps/BoardDetails/BoardDetails";

function App() {
  // const [backgroundImage, setBackgroundImage] = useState(currBackgroundImg);

  // const changeBackground = (url) => {
  //   setBackgroundImage(url);
  // }
  // console.log('backgroundImage', backgroundImage);
  return (
    // <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className="app">
      <Router>
        <div>
          <AppHeader />
          <Switch>
            {/* <Route component={Home} path="/"></Route> */}
            <Route component={HomePage} path="/home"></Route>
            <Route component={BoardDetails} path="/board/:id"></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
