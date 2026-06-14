import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import AboutMePage from './pages/AboutMePage';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  const [photo, setPhoto] = useState('');

  return (
    <BrowserRouter basename="/my-portfolio/">
      <Header />
      <Routes>
        <Route path="/"         element={<HomePage photo={photo} />} />
        <Route path="/about"    element={<AboutMePage photo={photo} onPhotoChange={setPhoto} />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
