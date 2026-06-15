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

  const handlePhotoChange = async (file, previewUrl) => {
    // 즉시 미리보기
    setPhoto(previewUrl);

    // Supabase Storage에 업로드
    const ext = file.name.split('.').pop();
    const path = `profile/photo.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-assets')
      .upload(path, file, { upsert: true, contentType: file.type });

    if (uploadError) {
      console.error('업로드 실패:', uploadError);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-assets')
      .getPublicUrl(path);

    // 캐시 방지용 타임스탬프 추가
    const urlWithTs = `${publicUrl}?t=${Date.now()}`;

    setPhoto(urlWithTs);
    localStorage.setItem('portfolio_photo', urlWithTs);

    // settings 테이블에 URL 저장
    await supabase.from('settings').upsert(
      { key: 'profile_photo_url', value: urlWithTs, updated_at: new Date().toISOString() },
      { onConflict: 'key' }
    );
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
