import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Layout from './Components/Layout';
import HomeJira from './Components/Home/HomeJira';
import EditedIssue from './Components/EditedIssue/EditedIssue';
import CreateJira from './Components/CreateJira/CreateJira';
import Backlog from './Components/Backlog/Backlog';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeJira />} />
          <Route path="create" element={<CreateJira />} />
          <Route path="edit/:issueId" element={<EditedIssue />} />
          <Route path="backlog" element={<Backlog />} />
        </Route>
      </Routes>

    </BrowserRouter>

  );
}

export default App;