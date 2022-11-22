import './scss/app.scss'
import AddPizzasPage from './pages/AddPizzasPage';
import { Routes, Route } from 'react-router-dom';
import NotFoundBlock from './components/NotFoundBlock';
import HomePage from './pages/HomePage';
import UpdatePizza from './pages/UpdatePizza';
import DeletePizza from './pages/DeletePizza';
import AddCategories from './pages/AddCategories';
import UpdateCategory from './pages/UpdateCategory';
import DeleteCategory from './pages/DeleteCategory';
import AuthorizationPage from './pages/AuthorizationPage';
import ProtectedRoutes from './CustomRoutes/ProtectedRoutes';

function App() {
  return (
    <div className='wrapper'>

      <div className='container'>
        <Routes>
          <Route path="/" element={<AuthorizationPage />}></Route>

          <Route element={<ProtectedRoutes/>}>
            <Route path="/home" element={<HomePage />} ></Route>
            <Route path="/addPizzas" element={<AddPizzasPage />} ></Route>
            <Route path="/updatePizza/:id" element={<UpdatePizza />}></Route>
            <Route path="/deletePizza/:id" element={<DeletePizza />}></Route>
            <Route path="/addCategories" element={<AddCategories />} ></Route>
            <Route path="/updateCategory/:id" element={<UpdateCategory />}></Route>
            <Route path="/deleteCategory/:id" element={<DeleteCategory />}></Route>
          </Route>

          <Route path="*" element={<NotFoundBlock />} ></Route>
        </Routes>
      </div>

    </div>
  );
}

export default App;
