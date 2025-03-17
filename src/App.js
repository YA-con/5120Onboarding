
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Home from './view/home';
import Uvindex from './view/uvindex';
import Uvdata from './view/uvdata';

function App() {
    return (
        <main className="layout">
            <Router>
                <Header />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="uvindex" element={<Uvindex />} />
                    <Route path="uvdata" element={<Uvdata />} />
                </Routes>
            </Router>
        </main>
    );
}

export default App;
