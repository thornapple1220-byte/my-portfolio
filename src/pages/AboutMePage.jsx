import { useState, useEffect, useRef } from 'react';
import {
  Box, Container, Typography, Card, Stack,
  Tab, Tabs, Avatar, Chip, IconButton,
  Grid, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Slider, Button, Tooltip,
} from '@mui/material';
import CameraAltIcon        from '@mui/icons-material/CameraAlt';
import SchoolIcon           from '@mui/icons-material/School';
import WorkIcon             from '@mui/icons-material/Work';
import PaletteIcon          from '@mui/icons-material/Palette';
import PersonIcon           from '@mui/icons-material/Person';
import MusicNoteIcon        from '@mui/icons-material/MusicNote';
import BrushIcon            from '@mui/icons-material/Brush';
import GestureIcon          from '@mui/icons-material/Gesture';
import DesignServicesIcon   from '@mui/icons-material/DesignServices';
import MovieIcon            from '@mui/icons-material/Movie';
import AutoAwesomeIcon      from '@mui/icons-material/AutoAwesome';
import DescriptionIcon      from '@mui/icons-material/Description';
import CodeIcon             from '@mui/icons-material/Code';
import SmartToyIcon         from '@mui/icons-material/SmartToy';
import AddIcon              from '@mui/icons-material/Add';
import { aboutMeData, skillsData, categoryColors, CATEGORIES } from '../data/aboutMeData';

/* ── 아이콘 매핑 ──────────────────────────────────────────── */
const skillIconMap = {
  'Adobe Photoshop':    <BrushIcon />,
  'Adobe Illustrator':  <GestureIcon />,
  'Figma':              <DesignServicesIcon />,
  'Adobe Premiere Pro': <MovieIcon />,
  'Adobe After Effects':<AutoAwesomeIcon />,
  '문서작성':           <DescriptionIcon />,
  'HTML/CSS':           <CodeIcon />,
  'Claude 바이브코딩':  <SmartToyIcon />,
};
const getSkillIcon = (name) => skillIconMap[name] ?? <CodeIcon />;

/* ── 섹션 레이블 ──────────────────────────────────────────── */
function SectionLabel({ text }) {
  return (
    <Typography
      sx={{
        display: 'inline-block',
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: 'var(--color-primary)',
        bgcolor: 'var(--color-accent)',
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
        mb: 2,
      }}
    >
      {text}
    </Typography>
  );
}

/* ── 프로필 사진 업로드 ────────────────────────────────────── */
function ProfilePhoto({ photo, onPhotoChange }) {
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onPhotoChange(URL.createObjectURL(file));
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <Avatar
          src={photo}
          sx={{
            width: 160, height: 160,
            bgcolor: 'var(--color-accent)',
            border: '4px solid rgba(255,255,255,0.9)',
            boxShadow: '0 8px 32px rgba(255,45,85,0.2)',
          }}
        >
          {!photo && <PersonIcon sx={{ fontSize: '4rem', color: 'var(--color-primary)' }} />}
        </Avatar>
        <IconButton
          onClick={() => fileInputRef.current?.click()}
          sx={{
            position: 'absolute', bottom: 4, right: 4,
            bgcolor: 'var(--color-primary)', color: '#fff',
            width: 36, height: 36,
            '&:hover': { bgcolor: 'var(--color-button-hover)', transform: 'scale(1.1)' },
            transition: 'all 0.2s',
          }}
        >
          <CameraAltIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />
      </Box>
      <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.5px' }}>
        클릭하여 사진 업로드
      </Typography>
    </Box>
  );
}

/* ── 기본 정보 카드 ────────────────────────────────────────── */
function InfoCard({ icon, label, value }) {
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: 2.5, px: 2, py: 1.5, minWidth: 140,
      }}
    >
      <Stack direction="row" spacing={1.2} alignItems="center">
        <Box sx={{ color: 'var(--color-accent)', display: 'flex', flexShrink: 0 }}>{icon}</Box>
        <Box>
          <Typography sx={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            {label}
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-white)' }}>
            {value}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}

/* ── I AM 섹션 ────────────────────────────────────────────── */
function IAmContent({ content }) {
  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ mb: 5 }}>
        <Typography sx={{ fontSize: { xs: '4rem', md: '6rem' }, fontWeight: 900, color: 'var(--color-accent)', lineHeight: 1, letterSpacing: '-2px', userSelect: 'none' }}>
          I AM
        </Typography>
        <Box sx={{ width: 56, height: 4, bgcolor: 'var(--color-primary)', mt: 1.5, borderRadius: 2 }} />
      </Box>
      <Stack spacing={3}>
        {content.map((phrase, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2.5, pl: 1 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0, bgcolor: idx === content.length - 1 ? 'var(--color-primary)' : 'var(--color-accent)' }} />
            <Typography sx={{ fontSize: { xs: '1.25rem', md: '1.75rem' }, fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.4, letterSpacing: '-0.3px' }}>
              {phrase}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

/* ── 스킬 카드 ────────────────────────────────────────────── */
function SkillCard({ skill, animated, delay }) {
  const color = categoryColors[skill.category] ?? '#999';
  return (
    <Tooltip title={skill.description ?? ''} placement="top" arrow>
      <Card
        elevation={0}
        sx={{
          p: 2.5, borderRadius: 3, height: '100%',
          border: '1px solid var(--color-border)',
          bgcolor: 'var(--color-bg-primary)',
          transition: 'box-shadow 0.2s, transform 0.2s',
          cursor: 'default',
          '&:hover': { boxShadow: '0 4px 20px rgba(255,45,85,0.12)', transform: 'translateY(-2px)' },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
          <Box
            sx={{
              width: 40, height: 40, borderRadius: 2, flexShrink: 0,
              bgcolor: `${color}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color,
            }}
          >
            {getSkillIcon(skill.name)}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {skill.name}
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 800, color, ml: 1, flexShrink: 0 }}>
                {skill.level}%
              </Typography>
            </Stack>
            <Chip
              label={skill.category}
              size="small"
              sx={{ height: 16, fontSize: '0.6rem', mt: 0.4, bgcolor: `${color}18`, color, border: 'none', '& .MuiChip-label': { px: 0.8 } }}
            />
          </Box>
        </Stack>

        {/* 프로그레스 바 */}
        <Box sx={{ bgcolor: 'var(--color-bg-soft)', borderRadius: 4, height: 8, overflow: 'hidden' }}>
          <Box
            sx={{
              width: animated ? `${skill.level}%` : '0%',
              height: '100%',
              borderRadius: 4,
              bgcolor: color,
              transition: `width 0.9s ease-out ${delay}ms`,
            }}
          />
        </Box>
      </Card>
    </Tooltip>
  );
}

/* ── 스킬 추가 다이얼로그 ─────────────────────────────────── */
function AddSkillDialog({ open, onClose, onAdd }) {
  const [form, setForm] = useState({ name: '', level: 50, category: 'Design', description: '' });

  const handleAdd = () => {
    if (!form.name.trim()) return;
    onAdd({ ...form, id: Date.now(), showInHome: form.level >= 60 });
    setForm({ name: '', level: 50, category: 'Design', description: '' });
    onClose();
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target?.value ?? e }));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>스킬 추가</DialogTitle>
      <DialogContent>
        <Stack spacing={2.5} sx={{ pt: 1 }}>
          <TextField label="기술명" value={form.name} onChange={set('name')} fullWidth size="small" />
          <TextField select label="카테고리" value={form.category} onChange={set('category')} fullWidth size="small">
            {CATEGORIES.filter((c) => c !== '전체').map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                숙련도
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                {form.level}%
              </Typography>
            </Stack>
            <Slider
              value={form.level}
              onChange={(_, v) => setForm((f) => ({ ...f, level: v }))}
              min={0} max={100}
              sx={{ color: 'var(--color-primary)', mt: 0.5 }}
            />
          </Box>
          <TextField label="설명 (툴팁)" value={form.description} onChange={set('description')} fullWidth size="small" multiline rows={2} />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} sx={{ color: 'var(--color-text-secondary)' }}>취소</Button>
        <Button
          onClick={handleAdd}
          variant="contained"
          sx={{ bgcolor: 'var(--color-button-primary)', '&:hover': { bgcolor: 'var(--color-button-hover)' }, fontWeight: 700 }}
        >
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/* ── 스킬 섹션 ────────────────────────────────────────────── */
function SkillsContent() {
  const [skills, setSkills] = useState(skillsData);
  const [filter, setFilter] = useState('전체');
  const [animated, setAnimated] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 120);
    return () => clearTimeout(t);
  }, []);

  const filtered = (filter === '전체' ? skills : skills.filter((s) => s.category === filter))
    .slice()
    .sort((a, b) => b.level - a.level);

  const filterColor = (cat) => (cat !== '전체' ? categoryColors[cat] : 'var(--color-primary)');

  return (
    <Box sx={{ py: 4 }}>
      {/* 카테고리 필터 */}
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 4 }}>
        {CATEGORIES.map((cat) => {
          const active = filter === cat;
          const color = filterColor(cat);
          return (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setFilter(cat)}
              sx={{
                fontWeight: 700,
                fontSize: '0.8rem',
                bgcolor: active ? color : 'var(--color-bg-soft)',
                color: active ? '#fff' : 'var(--color-text-secondary)',
                border: active ? 'none' : '1px solid var(--color-border)',
                transition: 'all 0.18s',
                '&:hover': { bgcolor: active ? color : `${color}18` },
              }}
            />
          );
        })}
      </Stack>

      {/* 스킬 그리드 */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {filtered.map((skill, idx) => (
          <Grid item xs={12} sm={6} md={4} key={skill.id}>
            <SkillCard skill={skill} animated={animated} delay={idx * 80} />
          </Grid>
        ))}
      </Grid>

      {/* 스킬 추가 버튼 */}
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => setDialogOpen(true)}
        sx={{
          borderColor: 'var(--color-border)',
          color: 'var(--color-text-secondary)',
          borderRadius: 2,
          fontWeight: 600,
          textTransform: 'none',
          '&:hover': { borderColor: 'var(--color-primary)', color: 'var(--color-primary)', bgcolor: 'var(--color-accent)' },
        }}
      >
        스킬 추가
      </Button>

      <AddSkillDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAdd={(newSkill) => {
          setSkills((prev) => [...prev, newSkill]);
          setFilter('전체');
        }}
      />
    </Box>
  );
}

/* ── 개인적인 이야기 ──────────────────────────────────────── */
function PersonalContent({ content }) {
  return (
    <Box sx={{ py: 4 }}>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
        <MusicNoteIcon sx={{ color: 'var(--color-primary)', fontSize: '1.5rem' }} />
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          취미 & 라이프스타일
        </Typography>
      </Stack>
      <Box sx={{ bgcolor: 'var(--color-bg-soft)', borderLeft: '4px solid var(--color-primary)', borderRadius: '0 12px 12px 0', p: 3, maxWidth: 600 }}>
        <Typography sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, color: 'var(--color-text-primary)', lineHeight: 1.9 }}>
          {content}
        </Typography>
      </Box>
    </Box>
  );
}

/* ── 탭 콘텐츠 라우터 ─────────────────────────────────────── */
function SectionContent({ section }) {
  if (section.id === 'i-am')    return <IAmContent content={section.content} />;
  if (section.id === 'skills')  return <SkillsContent />;
  return <PersonalContent content={section.content} />;
}

/* ── 메인 ───────────────────────────────────────────────── */
function AboutMePage() {
  const [photo, setPhoto] = useState(aboutMeData.basicInfo.photo);
  const [activeTab, setActiveTab] = useState(0);
  const { basicInfo, sections } = aboutMeData;

  const infoItems = [
    { icon: <SchoolIcon fontSize="small" />, label: '학력', value: basicInfo.education },
    { icon: <PaletteIcon fontSize="small" />, label: '전공', value: basicInfo.major },
    { icon: <WorkIcon fontSize="small" />,   label: '경력', value: basicInfo.experience },
  ];

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: 'var(--color-bg-primary)' }}>

      {/* ─ 프로필 히어로 ─ */}
      <Box sx={{ background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-secondary-mid) 100%)', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 4, md: 6 }} alignItems={{ xs: 'center', md: 'flex-start' }}>
            <ProfilePhoto photo={photo} onPhotoChange={setPhoto} />
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <SectionLabel text="About Me" />
              <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, fontWeight: 900, color: 'var(--color-text-white)', letterSpacing: '-1px', mb: 0.5 }}>
                {basicInfo.name}
              </Typography>
              <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-accent)', mb: 3, letterSpacing: '0.5px' }}>
                Web Designer
              </Typography>
              <Stack direction="row" spacing={1.5} flexWrap="wrap" justifyContent={{ xs: 'center', md: 'flex-start' }} useFlexGap>
                {infoItems.map(({ icon, label, value }) => (
                  <InfoCard key={label} icon={icon} label={label} value={value} />
                ))}
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* ─ 콘텐츠 탭 ─ */}
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            borderBottom: '2px solid var(--color-border)',
            mb: 1,
            '& .MuiTab-root': { fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-text-secondary)', textTransform: 'none', minWidth: 'auto', px: { xs: 2, md: 3 }, py: 1.5 },
            '& .Mui-selected': { color: 'var(--color-primary) !important' },
            '& .MuiTabs-indicator': { bgcolor: 'var(--color-primary)', height: 3, borderRadius: '3px 3px 0 0' },
          }}
        >
          {sections.map((section) => (
            <Tab
              key={section.id}
              label={
                <Stack direction="row" spacing={0.8} alignItems="center">
                  <span>{section.title}</span>
                  {section.showInHome && (
                    <Chip label="홈" size="small" sx={{ height: 18, fontSize: '0.6rem', fontWeight: 700, bgcolor: 'var(--color-accent)', color: 'var(--color-primary)', '& .MuiChip-label': { px: 0.8 } }} />
                  )}
                </Stack>
              }
            />
          ))}
        </Tabs>

        {sections.map((section, idx) => (
          <Box key={section.id} hidden={activeTab !== idx}>
            {activeTab === idx && <SectionContent section={section} />}
          </Box>
        ))}
      </Container>
    </Box>
  );
}

export default AboutMePage;
