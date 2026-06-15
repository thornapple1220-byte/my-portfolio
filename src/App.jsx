import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import AboutMePage from './pages/AboutMePage';
import ProjectsPage from './pages/ProjectsPage';
import { skillsData } from './data/aboutMeData';
import supabase from './utils/supabase';

function App() {
  const [photo, setPhoto] = useState(() => localStorage.getItem('portfolio_photo') || '');
  const [skills, setSkills] = useState(skillsData);

  // 앱 시작 시 Supabase에서 사진 URL 로드
  useEffect(() => {
    supabase
      .from('settings')
      .select('value')
      .eq('key', 'profile_photo_url')
      .maybeSingle()
      .then(({ data }) => {
        if (data?.value) {
          setPhoto(data.value);
          localStorage.setItem('portfolio_photo', data.value);
        }
      });
  }, []);

  const handlePhotoChange = (file, previewUrl) => {
    // 즉시 미리보기
    setPhoto(previewUrl);

    // base64로 변환 후 Supabase settings 테이블에 저장
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target.result;
      setPhoto(base64);
      localStorage.setItem('portfolio_photo', base64);

      const { error } = await supabase.from('settings').upsert(
        { key: 'profile_photo_url', value: base64, updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      );
      if (error) console.error('[사진] DB 저장 실패:', error.message);
    };
    reader.readAsDataURL(file);
  };

  return (
    <BrowserRouter basename="/my-portfolio/">
      <Header />
      <Routes>
        <Route path="/"         element={<HomePage photo={photo} skills={skills} />} />
        <Route path="/about"    element={<AboutMePage photo={photo} onPhotoChange={handlePhotoChange} skills={skills} onSkillsChange={setSkills} />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
