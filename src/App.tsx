import Home from "./pages/Home";
import Cart from "./pages/Cart"
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import FullPizza from "./pages/FullPizza";
import { Route, Routes } from 'react-router-dom'
import "./scss/app.scss";


function App() {


  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/pizzas/:id" element={<FullPizza />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
