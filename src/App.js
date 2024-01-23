import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Inventory/Components/Layout';
import Home from './Inventory/Components/Home/Home';
import DetailItem from './Inventory/Components/ViewAlert/DetailItem/DetailItem';
import CheckInLayout from './Inventory/Components/CheckIn/CheckInLayout';
import CheckOutLayout from './Inventory/Components/CheckOut/CheckOutLayout';
import ViewAlertItem from './Inventory/Components/ViewAlert/ViewAlertItem';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="view-alert" element={<ViewAlertItem/>} />
            <Route path="view-alert/:itemId" element={<DetailItem/>} />
            <Route path="check-in" element={<CheckInLayout/>} />
            <Route path="check-out" element={<CheckOutLayout/>} />
            {/* <Route path="movies/:movieId" element={<Details />}/> */}
          </Route>
        
        </Routes>      
      </BrowserRouter>

  );
}

export default App;