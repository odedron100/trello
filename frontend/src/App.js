import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import './assets/styles/main.scss'
import { currBackgroundImg } from './store/actions/ListActions'
import { BoardPage } from "./views/BoardPage/BoardPage";
import { AppHeader } from "./cmps/AppHeader/AppHeader"
import { useState } from "react";

function App() {
  const [backgroundImage, setBackgroundImage] = useState(currBackgroundImg);

  // const changeBackground = (url) => {
  //   setBackgroundImage(url);
  // }
  console.log('backgroundImage', backgroundImage);
  return (
    <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Router>
        <div>
          <AppHeader />
          <Switch>
            {/* <Route component={Home} path="/"></Route> */}
            <Route component={BoardPage} path="/board"></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
