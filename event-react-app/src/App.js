import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import WeeklyScheduler from './components/WeeklyScheduler';
import CurrentEventsProgress from 'components/CurrentEventsProgress';
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

  return (

<Router>
    <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/timetable">location map</Link>
            </li>
            <li>
              <Link to="/highlights">About us</Link>
            </li>
            
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <div className="App">
         
        <section> 
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/timetable/:id">
              <CurrentEventsProgress />
            </Route>
            <Route path="/timetable">
              <Redirect to={`/timetable/${moment().format('YYYY-MM-DD')}`} />
            </Route>
            
            <Route path="/highlights">
              <WeeklyScheduler/>
            </Route>
            
            <Route path="/">
           
              
              <div><h1>Description of our server and service</h1>
<p>Here is the description of the service and necessary terms.</p></div>
              <div class="image">
              {/* <img src="/img/map.png" width="1400" height="600"/> */}
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>{
                comments.map((element) =>
                (
                  <div >
                    
                    <p>{element.paragraph}</p>
                    <p>price {element.cash}</p>
                    
                  </div>
                ))}
              </div>
	
</div>
              
              
            </Route>

            <Route path="*">
              <NoMatch />
            </Route>
            
          </Switch>
          

        </section>
      </div>
    </div>
    </Router>
  );
}
function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

function About() {
  let location = useLocation();

  return (
    <div>
      <h2>
        About us
      </h2>
      <p>Here we are engaged in helping pets.</p>
    </div>
  );
}
 
export default App;