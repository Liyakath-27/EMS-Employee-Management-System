import './App.css';
import ListEmployeeComponents from './components/ListEmployeeComponents.jsx';
import HeaderComponent from './components/HeaderComponent.jsx';
import FotterComponent from './components/FotterComponent.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmpComponent from './components/EmpComponent.jsx';
import ViewEmployeeComponent from './components/ViewEmployeeComponent.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<ListEmployeeComponents />} />
          <Route path='/employees' element={<ListEmployeeComponents />} />
          <Route path='/add-employee' element={<EmpComponent />} />
          <Route path='/edit-employee/:id' element={<EmpComponent />} />
          <Route path='/view-employee/:id' element={<ViewEmployeeComponent />} />
        </Routes>
        <FotterComponent />
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
    </>
  );
}

export default App;