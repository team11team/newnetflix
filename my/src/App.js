import NaVeBar from "./components/NaVe Bar/NaVeBar";
import React from "react";
import './App.css'
import {action,orginals}from'./urls'
import Banner from "./components/Banner/Banner";
import Rowpost from "./components/RowPost/RowPost";






function App() {
  return (
    <div className="App">
      <NaVeBar/>
      <Banner/>
      <Rowpost url={orginals} title='Netflix Orginals'/>
      <Rowpost url={action} title='Action Movies' issmall />
      

      
      
    
      
      
    </div>
  );
}

export default App;
