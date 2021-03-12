import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import axios from 'axios';
import {io} from 'socket.io-client';
const ENDPOINT = "http://localhost:8080";


function App() {
  
  useEffect(() => {
    async function fetchMyAPI() {
      console.log('App rendered!!')
      const socket = io();
      const userName =  `User${Math.floor(Math.random() * 1000000)}`;
      socket.emit("new user", userName);


      socket.on("FromAPI", data => {
        console.log(data);
      });

      const response = await axios.get('/ping')
      console.log(response)
      console.log(response.data)
    }

    fetchMyAPI()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
