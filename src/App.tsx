import React from 'react';
import { Provider } from 'react-redux'
import Home from './app/scenes/home/Home';
import { createAppStore } from './app/reducers';

import './app/styles/App.scss'

const store = createAppStore()

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Home/>
      </Provider>
    )
  }
}

export default App;
