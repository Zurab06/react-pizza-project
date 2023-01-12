import Home from "./pages/Home";
import Cart from "./pages/Cart"
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import {Route,Routes}from 'react-router-dom'
import "./scss/app.scss";
import { useState } from "react";
import { createContext } from "react";
export const SearchContext = createContext()


function App() {
  const [searchValue,setSearch] = useState('')


  return (
    <div className="wrapper">
      
      { <SearchContext.Provider value={{searchValue,setSearch}}>
 <Header/>
      <div className="content">
        
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
        </div>
      </SearchContext.Provider> }
     
      </div>
   
  );
}

export default App;
