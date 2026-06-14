import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import AboutMePage from './pages/AboutMePage';
import ProjectsPage from './pages/ProjectsPage';
import { skillsData } from './data/aboutMeData';

function App() {
  const [photo, setPhoto] = useState('');
  const [skills, setSkills] = useState(skillsData);

  return (
    <BrowserRouter basename="/my-portfolio/">
      <Header />
      <Routes>
        <Route path="/"         element={<HomePage photo={photo} skills={skills} />} />
        <Route path="/about"    element={<AboutMePage photo={photo} onPhotoChange={setPhoto} skills={skills} onSkillsChange={setSkills} />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
