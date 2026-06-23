import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fab, Zoom, Tooltip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import AboutMePage from './pages/AboutMePage';
import ProjectsPage from './pages/ProjectsPage';
import { skillsData } from './data/aboutMeData';
import supabase from './utils/supabase';

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Zoom in={visible}>
      <Tooltip title="맨 위로" placement="left">
        <Fab
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          size="medium"
          sx={{
            position: 'fixed',
            bottom: { xs: 24, md: 32 },
            right: { xs: 20, md: 32 },
            zIndex: 1200,
            bgcolor: '#7B68EE',
            color: '#fff',
            boxShadow: '0 4px 16px rgba(123,104,238,0.35)',
            '&:hover': {
              bgcolor: '#5B4FCF',
              boxShadow: '0 6px 24px rgba(123,104,238,0.5)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Tooltip>
    </Zoom>
  );
}

function App() {
  const [photo, setPhoto] = useState(() => localStorage.getItem('portfolio_photo') || '');
  const [skills, setSkills] = useState(() => {
    try {
      const stored = localStorage.getItem('portfolio_skills');
      return stored ? JSON.parse(stored) : skillsData;
    } catch {
      return skillsData;
    }
  });

  useEffect(() => {
    localStorage.setItem('portfolio_skills', JSON.stringify(skills));
  }, [skills]);

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
      <ScrollToTopButton />
    </BrowserRouter>
  );
}

export default App;
