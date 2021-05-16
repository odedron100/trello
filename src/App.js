import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import './assets/styles/main.scss'
import { BoardPage } from "./views/BoardPage/BoardPage";
import { AppHeader } from "./cmps/AppHeader/AppHeader"

function App() {
  return (
    <div className="app" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1468581264429-2548ef9eb732?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c2VhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)` }}>
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
