import "ka-table/style.scss";
import "./style.scss";

import React, { Component } from 'react';
import { render } from 'react-dom';
import Demo from './Demo';

interface AppProps { }
interface AppState { }

class App extends Component<AppProps, AppState> {
  render() {
    return (
      <div>
        <Demo />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
