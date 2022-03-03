import React from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Store from './components/store.component'
import Client from './components/client.component'
import { ToastContainer } from 'react-toastify';
import LoginForm from './components/login.component'
import ProtectedRoute from './components/protectedRoutes.component'
import { connect } from 'react-redux'
import store from './store'
import LoadingScreen from './components/loading.component'



function App() {
  const state = store.getState()
  if (state.isLoading) {
    return <LoadingScreen />;
  }
  return (
    <Router>
      <ToastContainer />
        <div>
          <div>
            <Switch>
              <Route path='/sign-in' component={LoginForm} /> 
              <ProtectedRoute path='/' exact component={Store} />
              <ProtectedRoute path='/client' component={Client} />
            </Switch>
          </div>
        </div>
    </Router>
  )
}

export default connect((state) => state)(App)
