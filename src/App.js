import logo from './logo.svg';
import './App.css';
import Main from './components/MainComponent';
import { ConfigureStore } from './redux/configureStore';
import {Provider} from 'react-redux'


const store = ConfigureStore();
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
