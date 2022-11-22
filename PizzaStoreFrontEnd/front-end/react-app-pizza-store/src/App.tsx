import { Routes, Route } from "react-router-dom";



import Header from "./components/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PizzaInfo from "./pages/PizzaInfo";
import LoginPage from "./pages/LoginPage";

import './scss/app.scss';
import RegistrationPage from "./pages/RegistrationPage";


function App() {
  return (
    <>
      <div className="wrapper">
        
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/pizza/:id" element={<PizzaInfo />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegistrationPage />}></Route>

              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
       </div>


    </>
  );
}

export default App;
