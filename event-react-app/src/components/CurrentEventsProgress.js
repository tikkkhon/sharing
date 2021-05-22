import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { withRouter } from "react-router";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,  
  useLocation
} from "react-router-dom";
import moment from 'moment'
import axios from 'axios';
var faker = require("faker");
const { fake } = require("faker");



    async function getComments() {
        try {
          const comments = await axios.get('http://127.0.0.1:10010/api/v1/events?date=2021-02-22');
          return comments.data;
        } catch (error) {
          console.log({ error });
        }
      }
      
      function App() {
        const [comments, setComments] = useState([]);
      
        useEffect(() => {
          getComments()
            .then((comments) => {
              setComments(comments);
            })
            .catch((error) => console.log(error));
        }, []);

    


        return <div >
        <h1>here you can find out where the nearest scooters are located</h1>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>{
                comments.map((element) =>
                ( 
               
                   
                        
                  <div style={{ border: "1px solid black" }}>
                  
                  
                    <p style={{ color: "red" }}>{element.adress}</p>
                    <p>{element.text}</p>
                    <p>{element.coordinates}</p>
                    <p>{element.long} meters</p>
                    
                  </div>
                ))}
              </div>
              <p></p>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>{
                comments.map((element) =>
                ( 
               
                   
                        
                  <div style={{ border: "1px solid black" }}>
                  
                  
                    <p style={{ color: "red" }}>{element.adress}</p>
                    <p>{element.text}</p>
                    <p>{element.coordinates}</p>
                    <p>{element.long} meters</p>
                    
                  </div>
                ))}
              </div>
        </div>
    
}

export default App;