import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Computer from './components/computer';
import TwoPlayer from "./components/twoPlayers"

import { round, setRound } from './components/rounds.js';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/*" element={<Home />}></Route>
					<Route path="/playComputer" element={<Computer />}></Route>
					<Route path="/playerVsPlayer" element={<TwoPlayer />}></Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
