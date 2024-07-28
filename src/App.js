import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import { Route, Routes } from 'react-router-dom';
import PostDetail from './components/PostDetail';
import PostUpdate from './components/PostUpdate';
import CreateNewPost from './components/CreateNewPost';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/edit/:id" element={<PostUpdate />} />
        <Route path="/posts/new" element={<CreateNewPost />} />
      </Routes>
    </div>
  );
}

export default App;
