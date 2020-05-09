import React from 'react';
import { render } from 'react-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from './ui-component/cards/Carts'


export default function App() {

  return <Cards />  

};

render(<App />, document.getElementById('root'));
