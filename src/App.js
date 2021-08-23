import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import About from './components/About'
import Home from './components/Home'
import Screener from './components/Screener'

function App() {
  return (
    <Router>
      <div>
        <header>
          <h2>Anki Deck Screener</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li><Link to={'/'} className="nav-link">Home</Link></li>
              <li><Link to={'/about'} className="nav-link">About</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/screener/:deckName' component={Screener} />
            <Route path='/about' component={About} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
