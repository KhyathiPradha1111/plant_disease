import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import DetectionScreen from './screens/DetectionScreen';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/detect" element={<DetectionScreen />} />
    </Routes>
  );
};

export default App;