import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/app/App'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
