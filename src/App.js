import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Polling from './component/Polling';
import './scss/style.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Polling />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
