import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store';
import './index.css'
import App from './App'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
)