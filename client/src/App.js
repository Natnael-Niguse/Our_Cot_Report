import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './HomePage';
import CotsPage from './CotsPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path='/homepage' element={<HomePage />}></Route>
        <Route path='/CotsPage' element={<CotsPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
