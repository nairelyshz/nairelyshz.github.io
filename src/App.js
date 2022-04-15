import Home from './views/Home.jsx';
import SpotDetails from './views/SpotDetails.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/:id/details" element={<SpotDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
