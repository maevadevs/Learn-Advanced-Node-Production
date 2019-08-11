// Dependencies
import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

// Components
import App from 'components/App'
import reducers from 'reducers'

// For testing
import axios from 'axios'
window.axios = axios

// Redux Store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

// Start Render
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
