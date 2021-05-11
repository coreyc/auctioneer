import './App.css';
import HighestBid from './HighestBid'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="card">
          <img src="" className="product-image" />
          <p className="price">Current bid</p>
          <HighestBid />
          <input></input>
          <p><button>Enter bid</button></p>
        </div>
      </header>
    </div>
  );
}

export default App;
