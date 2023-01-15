import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter , Route , Routes , Link} from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingsscrren from './screens/Bookingsscrren';
import Register from './screens/Register';
import Loginscreen from './screens/Loginscreen';


function App() {
  return (
  
    <div className="App">
      <Navbar/>

      <BrowserRouter>
        <Routes>
       <Route path="/home" element={< Homescreen />} />
       <Route path="/book/:id/:fromdate/:todate" element={< Bookingsscrren />} />
       <Route path="/register" element={< Register />} />
       <Route path="/login" element={< Loginscreen />} />
      

       </Routes>
      </BrowserRouter>
    </div>

    
  );
}

export default App;
