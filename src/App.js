import Admin from './components/admin'
import User from './components/user'
import Explore from './components/explore'
import Tab from './components/tab'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import { motion } from 'framer-motion'
import './styles/main.css'
import './styles/app.css'
import { useState } from 'react'

function App() {

  const[show, setShow] = useState(false)

  const obj1 = {
    ini: {
      height: 0,
      padding: 0
    },
    fin: {
      padding: 30,
      height: 370,
      transition: {
        delay: 0.3,
        duration: 0.5
      }
    }
  }

  const obj2 = {
    ini: {
      opacity: 0
    },
    fin: {
      opacity: 1,
      transition: {
        delay: 0.8,
        duration: 0.3
      }
    }
  }

  const obj3 = {
    ini: {
      height: 80
    },
    fin: {
      height: 200,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
      <Router className="route">
        <Switch>
          <Route exact path="/">
            <h1 className="mainHead">Notes Sharing</h1>
            <motion.div
             className="route"
             variants={obj3}
             initial="ini"
             animate={show ? "fin":""}
            >
              <ul>
                <Link style={{
                  textDecoration: 'none',
                  color: 'white',
                }} to="/user"><span>User</span></Link>
              </ul>
              <div className="about">
                <p className="ap" onClick={() => setShow(!show)}>About</p>
                 <motion.section
                  className="hidden"
                  variants={obj1}
                  initial="ini"
                  animate={show ? "fin":""}
                >
                  <motion.p
                   variants={obj2}
                   initial="ini"
                   animate={show ? "fin":""}
                  >
                  Greetings, This is is a Notes sharing apps. The way it works is, there are two sections
                  in this web app, one with me and that is supposed to be the secured one, Admin and the other  
                  for the Users. Now admin has made the account of all the users from their respective years 
                  and Branches. User has been given a password and an email to access the contents of this app
                  by his teacher. He/She may go towards the login section, login to his/her respective year failing to  
                  do so will result in invalid user, once logged in, he/she can view notes shared from any other Branches
                  but he can't post in other branches. He/she can only in his/her respective branch.<br /><br />
                  This app has some codes taken from sources, for styling purposes, as main focus was ReactJS and Firebase's
                  implementation.
                  </motion.p>
                </motion.section> 
              </div>
            </motion.div>
          </Route>
          <Route component={Admin} path="/admin:key" />
          <Route render={props => <User props={props}/>} path="/user" />
          <Route render={props => {
            return (
              localStorage.getItem("userA") ? 
              <Explore props={props}/>:<Redirect to="/user" />
            )
          }} path="/explore" />
          <Route render={(props) => {
            return (
              localStorage.getItem("userA") ? 
              <Tab props={props}/>:<Redirect to="/user" />
            )
          }} path="/tab:id"/>
        </Switch>
      </Router>
  );
}

export default App;
