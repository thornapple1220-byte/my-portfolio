import { memo, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box, Container, Typography, Card, Stack,
  Tab, Tabs, Avatar, Chip, IconButton,
  Grid, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Slider, Button, Tooltip,
  Switch, FormControlLabel,
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
import EditIcon             from '@mui/icons-material/Edit';
import DeleteIcon           from '@mui/icons-material/Delete';
import { aboutMeData, categoryColors, CATEGORIES } from '../data/aboutMeData';

/* ── 아이콘 매핑 ──────────────────────────────────────────── */
const skillIconMap = {
  'Adobe Photoshop':     <BrushIcon />,
  'Adobe Illustrator':   <GestureIcon />,
  'Figma':               <DesignServicesIcon />,
  'Adobe Premiere Pro':  <MovieIcon />,
  'Adobe After Effects': <AutoAwesomeIcon />,
  '문서작성':            <DescriptionIcon />,
  'HTML/CSS':            <CodeIcon />,
  'Claude 바이브코딩':   <SmartToyIcon />,
};
const getSkillIcon = (name) => skillIconMap[name] ?? <CodeIcon />;

/* ── 섹션 레이블 ──────────────────────────────────────────── */
const SectionLabel = memo(function SectionLabel({ text }) {
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
        px: 1.5, py: 0.5,
        borderRadius: 1,
        mb: 2,
      }}
    >
      {text}
    </Typography>
  );
});

/* ── 프로필 사진 업로드 ────────────────────────────────────── */
const ProfilePhoto = memo(function ProfilePhoto({ photo, onPhotoChange }) {
  const fileInputRef = useRef(null);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    onPhotoChange(file, previewUrl);
  }, [onPhotoChange]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <Avatar
          src={photo}
          imgProps={{ loading: 'lazy', alt: '프로필 사진' }}
          sx={{
            width: 160, height: 160,
            bgcolor: 'var(--color-accent)',
            border: '4px solid rgba(255,255,255,0.9)',
            boxShadow: '0 8px 32px rgba(255,45,85,0.2)',
          }}
        >
          {!photo && <PersonIcon sx={{ fontSize: '4rem', color: 'var(--color-primary)' }} />}
        </Avatar>
        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />
      </Box>
    </Box>
  );
});

/* ── 기본 정보 카드 ────────────────────────────────────────── */
const InfoCard = memo(function InfoCard({ icon, label, value }) {
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: 2.5, px: { xs: 1.5, sm: 2 }, py: { xs: 1.2, sm: 1.5 },
        width: '100%', height: '100%', textAlign: 'left',
      }}
    >
      <Stack direction="row" spacing={0.7} alignItems="center" sx={{ mb: 0.5 }}>
        <Box sx={{ color: 'var(--color-accent)', display: 'flex', flexShrink: 0 }}>{icon}</Box>
        <Typography noWrap sx={{ fontSize: { xs: '0.85rem', sm: '0.8rem' }, color: 'rgba(255,255,255,0.7)', fontWeight: 700, letterSpacing: '0.5px' }}>
          {label}
        </Typography>
      </Stack>
      <Box sx={{ pl: '26px', overflow: 'hidden' }}>
        <Typography noWrap sx={{ fontSize: { xs: '0.95rem', sm: '0.9rem' }, fontWeight: 700, color: 'var(--color-text-white)' }}>
          {value}
        </Typography>
      </Box>
    </Card>
  );
});

/* ── I AM 섹션 ────────────────────────────────────────────── */
const IAmContent = memo(function IAmContent({ content }) {
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
            <Box sx={{
              width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
              bgcolor: idx === content.length - 1 ? 'var(--color-primary)' : 'var(--color-accent)',
            }} />
            <Typography sx={{ fontSize: { xs: '1.25rem', md: '1.75rem' }, fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.4, letterSpacing: '-0.3px' }}>
              {phrase}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
});

/* ── 스킬 카드 ────────────────────────────────────────────── */
const SkillCard = memo(function SkillCard({ skill, animated, delay, onEdit, onDelete }) {
  const color = categoryColors[skill.category] ?? '#999';

  return (
    <Tooltip title={skill.description ?? ''} placement="top" arrow>
      <Card
        elevation={0}
        tabIndex={0}
        aria-label={`${skill.name}, ${skill.category} 카테고리, ${skill.level}% 숙련도`}
        sx={{
          p: { xs: 1.5, sm: 2.5 }, borderRadius: 3, height: '100%',
          border: '1px solid var(--color-border)',
          bgcolor: 'var(--color-bg-primary)',
          position: 'relative',
          transition: 'box-shadow 0.2s, transform 0.2s',
          cursor: 'default',
          '&:hover': { boxShadow: '0 4px 20px rgba(255,45,85,0.12)', transform: 'translateY(-2px)' },
          '&:hover .skill-actions': { opacity: 1 },
          '&:focus-visible': { outline: '2px solid var(--color-primary)', outlineOffset: 2 },
        }}
      >
        {/* 수정 / 삭제 버튼 (hover 시 표시) */}
        <Box
          className="skill-actions"
          sx={{ position: 'absolute', top: 6, right: 6, display: 'flex', gap: 0.2, opacity: 0, transition: 'opacity 0.15s' }}
        >
          <IconButton
            size="small"
            aria-label={`${skill.name} 수정`}
            onClick={(e) => { e.stopPropagation(); onEdit(skill); }}
            sx={{ width: 26, height: 26, color: 'var(--color-text-secondary)', '&:hover': { color: 'var(--color-primary)', bgcolor: 'var(--color-accent)' } }}
          >
            <EditIcon sx={{ fontSize: '0.85rem' }} />
          </IconButton>
          <IconButton
            size="small"
            aria-label={`${skill.name} 삭제`}
            onClick={(e) => { e.stopPropagation(); onDelete(skill.id); }}
            sx={{ width: 26, height: 26, color: 'var(--color-text-secondary)', '&:hover': { color: '#d32f2f', bgcolor: 'rgba(211,47,47,0.08)' } }}
          >
            <DeleteIcon sx={{ fontSize: '0.85rem' }} />
          </IconButton>
        </Box>

        <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 1.5 }} sx={{ mb: { xs: 1.5, sm: 2 } }}>
          <Box
            sx={{
              width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 }, borderRadius: 2, flexShrink: 0,
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

        <Box
          role="progressbar"
          aria-valuenow={skill.level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${skill.name} 숙련도 ${skill.level}%`}
          sx={{ bgcolor: 'var(--color-bg-soft)', borderRadius: 4, height: 8, overflow: 'hidden' }}
        >
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
});

/* ── 스킬 다이얼로그 (추가 / 수정 공용) ──────────────────── */
function SkillDialog({ open, onClose, onSave, initialValues }) {
  const isEdit = Boolean(initialValues);
  const [form, setForm] = useState({ name: '', level: 50, category: 'Design', description: '', showInHome: false });

  useEffect(() => {
    if (open) {
      setForm(initialValues
        ? {
            name: initialValues.name,
            level: initialValues.level,
            category: initialValues.category,
            description: initialValues.description ?? '',
            showInHome: initialValues.showInHome,
          }
        : { name: '', level: 50, category: 'Design', description: '', showInHome: false }
      );
    }
  }, [open, initialValues]);

  const handleSave = () => {
    if (!form.name.trim()) return;
    onSave(isEdit ? { ...initialValues, ...form } : { ...form, id: Date.now() });
    onClose();
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target?.value ?? e }));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth aria-labelledby="skill-dialog-title">
      <DialogTitle id="skill-dialog-title" sx={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
        {isEdit ? '스킬 수정' : '스킬 추가'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2.5} sx={{ pt: 1 }}>
          <TextField label="기술명" value={form.name} onChange={set('name')} fullWidth size="small" autoFocus />
          <TextField select label="카테고리" value={form.category} onChange={set('category')} fullWidth size="small">
            {CATEGORIES.filter((c) => c !== '전체').map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>숙련도</Typography>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)' }}>{form.level}%</Typography>
            </Stack>
            <Slider
              value={form.level}
              onChange={(_, v) => setForm((f) => ({ ...f, level: v }))}
              min={0} max={100}
              aria-label="숙련도 슬라이더"
              sx={{ color: 'var(--color-primary)', mt: 0.5 }}
            />
          </Box>
          <TextField label="설명 (툴팁)" value={form.description} onChange={set('description')} fullWidth size="small" multiline rows={2} />
          <FormControlLabel
            control={
              <Switch
                checked={form.showInHome}
                onChange={(e) => setForm((f) => ({ ...f, showInHome: e.target.checked }))}
                aria-label="홈 탭에 표시"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: 'var(--color-primary)' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: 'var(--color-primary)' },
                }}
              />
            }
            label={<Typography sx={{ fontSize: '0.85rem', color: 'var(--color-text-primary)' }}>홈 탭에 표시</Typography>}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} sx={{ color: 'var(--color-text-secondary)' }}>취소</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{ bgcolor: 'var(--color-button-primary)', '&:hover': { bgcolor: 'var(--color-button-hover)' }, fontWeight: 700 }}
        >
          {isEdit ? '저장' : '추가'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/* ── 스킬 섹션 ────────────────────────────────────────────── */
function SkillsContent({ skills, onSkillsChange }) {
  const [filter, setFilter] = useState('전체');
  const [animated, setAnimated] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 120);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() =>
    (filter === '전체' ? skills : skills.filter((s) => s.category === filter))
      .slice()
      .sort((a, b) => b.level - a.level),
    [skills, filter]
  );

  const filterColor = useCallback(
    (cat) => (cat !== '전체' ? categoryColors[cat] : 'var(--color-primary)'),
    []
  );

  const handleOpenAdd = useCallback(() => {
    setEditTarget(null);
    setDialogOpen(true);
  }, []);

  const handleOpenEdit = useCallback((skill) => {
    setEditTarget(skill);
    setDialogOpen(true);
  }, []);

  const handleDelete = useCallback((skillId) => {
    onSkillsChange((prev) => prev.filter((s) => s.id !== skillId));
  }, [onSkillsChange]);

  const handleSave = useCallback((savedSkill) => {
    if (editTarget) {
      onSkillsChange((prev) => prev.map((s) => s.id === savedSkill.id ? savedSkill : s));
    } else {
      onSkillsChange((prev) => [...prev, savedSkill]);
    }
    setFilter('전체');
  }, [editTarget, onSkillsChange]);

  return (
    <Box sx={{ py: 4 }}>
      {/* 카테고리 필터 */}
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 4 }} role="toolbar" aria-label="카테고리 필터">
        {CATEGORIES.map((cat) => {
          const active = filter === cat;
          const color = filterColor(cat);
          return (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={active}
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
      <Box sx={{ overflow: 'hidden', mb: 4 }}>
      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        {filtered.map((skill, idx) => (
          <Grid item xs={6} sm={6} md={4} key={skill.id}>
            <SkillCard
              skill={skill}
              animated={animated}
              delay={idx * 80}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
        {filtered.length === 0 && (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 6, color: 'var(--color-text-secondary)' }}>
              <Typography sx={{ fontSize: '0.95rem' }}>해당 카테고리의 스킬이 없어요.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
      </Box>

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleOpenAdd}
        aria-label="새 스킬 추가"
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

      <SkillDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialValues={editTarget}
      />
    </Box>
  );
}

/* ── 개인적인 이야기 ──────────────────────────────────────── */
const PersonalContent = memo(function PersonalContent({ content }) {
  return (
    <Box sx={{ py: 4 }}>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
        <MusicNoteIcon sx={{ color: 'var(--color-primary)', fontSize: '1.5rem' }} />
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          취미 & 라이프스타일
        </Typography>
      </Stack>
      <Box sx={{
        bgcolor: 'var(--color-bg-soft)',
        borderLeft: '4px solid var(--color-primary)',
        borderRadius: '0 12px 12px 0',
        p: 3, maxWidth: 600,
      }}>
        <Typography sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, color: 'var(--color-text-primary)', lineHeight: 1.9 }}>
          {content}
        </Typography>
      </Box>
    </Box>
  );
});

/* ── 탭 콘텐츠 라우터 ─────────────────────────────────────── */
function SectionContent({ section, skills, onSkillsChange }) {
  if (section.id === 'i-am')   return <IAmContent content={section.content} />;
  if (section.id === 'skills') return <SkillsContent skills={skills} onSkillsChange={onSkillsChange} />;
  return <PersonalContent content={section.content} />;
}

/* ── 탭 페이드 인 래퍼 ────────────────────────────────────── */
const fadeIn = {
  '@keyframes tabFadeIn': {
    from: { opacity: 0, transform: 'translateY(10px)' },
    to:   { opacity: 1, transform: 'translateY(0)' },
  },
};

/* ── 메인 ───────────────────────────────────────────────── */
function AboutMePage({ photo, onPhotoChange, skills, onSkillsChange }) {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    const tab = Number(searchParams.get('tab'));
    return Number.isFinite(tab) ? tab : 0;
  });
  const { basicInfo, sections } = aboutMeData;

  const handleTabChange = useCallback((_, v) => setActiveTab(v), []);

  const infoItems = useMemo(() => [
    { icon: <SchoolIcon fontSize="small" />, label: '학력', value: basicInfo.education },
    { icon: <PaletteIcon fontSize="small" />, label: '전공', value: basicInfo.major },
    { icon: <WorkIcon fontSize="small" />,   label: '경력', value: basicInfo.experience },
  ], [basicInfo.education, basicInfo.major, basicInfo.experience]);

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: 'var(--color-bg-primary)' }}>

      {/* ─ 프로필 히어로 ─ */}
      <Box sx={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(145deg, #0d1333 0%, #1a1650 50%, #0e2454 100%)',
        py: { xs: 7, md: 10 },
      }}>
        {/* 도트 그리드 */}
        <Box sx={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        {/* 글로우 원 - 우상단 */}
        <Box sx={{
          position: 'absolute', top: '-20%', right: '-5%',
          width: { xs: 200, md: 380 }, height: { xs: 200, md: 380 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,45,85,0.15) 0%, transparent 68%)',
          animation: 'aboutGlow1 9s ease-in-out infinite',
          '@keyframes aboutGlow1': {
            '0%,100%': { transform: 'scale(1) translateY(0)' },
            '50%': { transform: 'scale(1.1) translateY(-20px)' },
          },
        }} />

        {/* 글로우 원 - 좌하단 */}
        <Box sx={{
          position: 'absolute', bottom: '-20%', left: '-5%',
          width: { xs: 160, md: 320 }, height: { xs: 160, md: 320 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30,58,110,0.5) 0%, transparent 68%)',
          animation: 'aboutGlow2 11s ease-in-out infinite',
          '@keyframes aboutGlow2': {
            '0%,100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(16px)' },
          },
        }} />

        {/* 링 장식 - 우하단 */}
        <Box sx={{
          display: { xs: 'none', sm: 'block' },
          position: 'absolute', bottom: '10%', right: '6%',
          width: { sm: 55, md: 80 }, height: { sm: 55, md: 80 },
          border: '2px solid rgba(255,45,85,0.2)', borderRadius: '8px',
          animation: 'aboutSpin 20s linear infinite',
          '@keyframes aboutSpin': { '100%': { transform: 'rotate(360deg)' } },
        }} />

        {/* 링 - 좌상단 */}
        <Box sx={{
          position: 'absolute',
          top: { xs: '5%', md: '12%' }, left: { xs: '-2%', md: '3%' },
          width: { xs: 55, md: 100 }, height: { xs: 55, md: 100 },
          borderRadius: '50%', border: '1px solid rgba(255,255,255,0.07)',
          animation: 'aboutFloat 7s ease-in-out infinite',
          '@keyframes aboutFloat': {
            '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
            '50%': { transform: 'translateY(-12px) rotate(15deg)' },
          },
        }} />

        {/* 수평 라인 (데스크톱) */}
        <Box sx={{
          display: { xs: 'none', lg: 'block' },
          position: 'absolute', top: '50%', left: 0,
          width: '8%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,45,85,0.35))',
        }} />
        <Box sx={{
          display: { xs: 'none', lg: 'block' },
          position: 'absolute', top: '50%', right: 0,
          width: '8%', height: '1px',
          background: 'linear-gradient(270deg, transparent, rgba(255,45,85,0.35))',
        }} />

        {/* 컨텐츠 */}
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 4, md: 6 }} alignItems="center">
            {/* 프로필 사진 - 글로우 링 효과 추가 */}
            <Box sx={{
              position: 'relative', flexShrink: 0,
              '&::before': {
                content: '""', position: 'absolute',
                inset: -6, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(255,45,85,0.6), rgba(30,58,110,0.6))',
                animation: 'ringPulse 3s ease-in-out infinite',
                '@keyframes ringPulse': {
                  '0%,100%': { opacity: 0.5, transform: 'scale(1)' },
                  '50%': { opacity: 1, transform: 'scale(1.04)' },
                },
              },
            }}>
              <ProfilePhoto photo={photo} onPhotoChange={onPhotoChange} />
            </Box>

            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <SectionLabel text="About Me" />
              <Typography variant="h1" sx={{
                fontSize: { xs: '2.4rem', md: '3.2rem' },
                fontWeight: 900, color: '#ffffff',
                letterSpacing: '-1.5px', mb: 0.5,
                textShadow: '0 4px 24px rgba(255,45,85,0.2)',
              }}>
                {basicInfo.name}
              </Typography>
              <Typography sx={{
                fontSize: { xs: '0.95rem', md: '1rem' },
                fontWeight: 700, color: '#FF2D55',
                mb: 3, letterSpacing: '3px', textTransform: 'uppercase',
              }}>
                Web Designer
              </Typography>
              {/* 구분선 */}
              <Box sx={{ width: 48, height: 3, bgcolor: '#FF2D55', borderRadius: 2, mb: 3, mx: { xs: 'auto', md: 0 } }} />
              <Grid container spacing={1.5} alignItems="stretch">
                {infoItems.map(({ icon, label, value }) => (
                  <Grid size={{ xs: 12, sm: 4 }} key={label} sx={{ display: 'flex' }}>
                    <InfoCard icon={icon} label={label} value={value} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* ─ 콘텐츠 탭 ─ */}
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="About Me 섹션 탭"
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
              id={`tab-${section.id}`}
              aria-controls={`tabpanel-${section.id}`}
              label={
                <Stack direction="row" spacing={0.8} alignItems="center">
                  <span>{section.title}</span>
                  {section.showInHome && (
                    <Chip
                      label="홈"
                      size="small"
                      sx={{ height: 18, fontSize: '0.6rem', fontWeight: 700, bgcolor: 'var(--color-accent)', color: 'var(--color-primary)', '& .MuiChip-label': { px: 0.8 } }}
                    />
                  )}
                </Stack>
              }
            />
          ))}
        </Tabs>

        {sections.map((section, idx) => (
          <Box
            key={section.id}
            role="tabpanel"
            id={`tabpanel-${section.id}`}
            aria-labelledby={`tab-${section.id}`}
            hidden={activeTab !== idx}
          >
            {activeTab === idx && (
              <Box sx={{ ...fadeIn, animation: 'tabFadeIn 0.25s ease-out' }}>
                <SectionContent section={section} skills={skills} onSkillsChange={onSkillsChange} />
              </Box>
            )}
          </Box>
        ))}
      </Container>
    </Box>
  );
}

export default AboutMePage;
