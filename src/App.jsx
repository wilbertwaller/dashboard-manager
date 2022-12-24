import React from 'react'
import Content from './content/Content';
import Footer from './footer/Footer';
import Header from './header/Header';

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import './App.css'

function App() {
  return (<>
    <Header />
    <Content />
    <Footer />
  </>);
}

export default App;
