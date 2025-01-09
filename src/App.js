import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Menu } from './components/Menu';
import  About  from './components/About';
import { Comments } from './components/Comments';
import { Navbar } from './components/Navbar';
import { ShoppingCartlist } from './components/ShoppingCartlist';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/shoppingCartlist" element={<ShoppingCartlist />} />
      </Routes>
    </div>
  );
}

export default App;



// json-server --watch C:\Users\Süleyman\Desktop\FoodOrdering\api\db.json --port 3001