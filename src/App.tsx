import { HashRouter, Route } from 'react-router-dom';
import Home from './pages/home/Home';

function App() {
  return (
    <HashRouter>
      <Route path='/' component={Home} />
    </HashRouter>
  );
}

export default App;
