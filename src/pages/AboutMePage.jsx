import { memo, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box, Typography, Card, Stack,
  Avatar, Chip, IconButton,
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
import AttachMoneyIcon      from '@mui/icons-material/AttachMoney';
import AddIcon              from '@mui/icons-material/Add';
import EditIcon             from '@mui/icons-material/Edit';
import DeleteIcon           from '@mui/icons-material/Delete';
import { aboutMeData, categoryColors, CATEGORIES } from '../data/aboutMeData';
import supabase from '../utils/supabase';

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
  '회계':               <AttachMoneyIcon />,
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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box
        sx={{
          width: { xs: 160, md: 180 },
          borderRadius: 3,
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
          boxShadow: '0 8px 32px rgba(123,104,238,0.14)',
        }}
      >
        {photo ? (
          <Box
            component="img"
            src={photo}
            alt="프로필 사진"
            loading="lazy"
            sx={{ width: '100%', display: 'block', objectFit: 'contain' }}
          />
        ) : (
          <Box sx={{
            width: '100%', aspectRatio: '3/4',
            bgcolor: 'var(--color-accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <PersonIcon sx={{ fontSize: '5rem', color: 'var(--color-primary)' }} />
          </Box>
        )}
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
        bgcolor: 'var(--color-bg-soft)',
        border: '1px solid var(--color-border)',
        borderRadius: 2.5, px: { xs: 1.5, sm: 2 }, py: { xs: 1.2, sm: 1.5 },
        width: '100%', height: '100%', textAlign: 'left',
      }}
    >
      <Stack direction="row" spacing={0.7} alignItems="center" sx={{ mb: 0.5 }}>
        <Box sx={{ color: 'var(--color-primary)', display: 'flex', flexShrink: 0 }}>{icon}</Box>
        <Typography noWrap sx={{ fontSize: { xs: '0.85rem', sm: '0.8rem' }, color: 'var(--color-text-secondary)', fontWeight: 700, letterSpacing: '0.5px' }}>
          {label}
        </Typography>
      </Stack>
      <Box sx={{ pl: '26px', overflow: 'hidden' }}>
        <Typography noWrap sx={{ fontSize: { xs: '0.95rem', sm: '0.9rem' }, fontWeight: 700, color: 'var(--color-text-primary)' }}>
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
          '&:hover': { boxShadow: '0 4px 20px rgba(123,104,238,0.12)', transform: 'translateY(-2px)' },
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
/* ── 경력 다이얼로그 ─────────────────────────────────────── */
function CareerDialog({ open, onClose, onSave, initialValues, skills = [] }) {
  const isEdit = Boolean(initialValues);
  const skillNames = skills.map((s) => s.name);

  const [form, setForm] = useState({ company: '', role: '', period: '', description: '' });
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customTags, setCustomTags] = useState('');

  useEffect(() => {
    if (!open) return;
    if (initialValues) {
      const { company, role, period, description, tags = [] } = initialValues;
      setForm({ company, role, period, description });
      setSelectedSkills(tags.filter((t) => skillNames.includes(t)));
      setCustomTags(tags.filter((t) => !skillNames.includes(t)).join(', '));
    } else {
      setForm({ company: '', role: '', period: '', description: '' });
      setSelectedSkills([]);
      setCustomTags('');
    }
  }, [open, initialValues]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleSkill = (name) =>
    setSelectedSkills((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );

  const handleSave = () => {
    if (!form.company.trim()) return;
    const extra = customTags.split(',').map((t) => t.trim()).filter(Boolean);
    const tags = [...selectedSkills, ...extra.filter((t) => !selectedSkills.includes(t))];
    onSave(isEdit ? { ...initialValues, ...form, tags } : { ...form, id: Date.now(), tags });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth aria-labelledby="career-dialog-title">
      <DialogTitle id="career-dialog-title" sx={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
        {isEdit ? '경력 수정' : '경력 추가'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2.5} sx={{ pt: 1 }}>
          <TextField label="회사명" value={form.company} onChange={set('company')} fullWidth size="small" autoFocus />
          <TextField label="직책 / 역할" value={form.role} onChange={set('role')} fullWidth size="small" />
          <TextField label="기간 (예: 2022.03 - 현재)" value={form.period} onChange={set('period')} fullWidth size="small" />
          <TextField label="업무 설명" value={form.description} onChange={set('description')} fullWidth size="small" multiline rows={3} />

          {/* 스킬 선택 */}
          <Box>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', mb: 1 }}>
              스킬트리에서 선택
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7 }}>
              {skillNames.map((name) => {
                const active = selectedSkills.includes(name);
                return (
                  <Chip
                    key={name}
                    label={name}
                    size="small"
                    onClick={() => toggleSkill(name)}
                    sx={{
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      bgcolor: active ? 'var(--color-primary)' : 'rgba(123,104,238,0.08)',
                      color: active ? '#fff' : 'var(--color-primary)',
                      '&:hover': { bgcolor: active ? 'var(--color-primary-dark)' : 'rgba(123,104,238,0.18)' },
                    }}
                  />
                );
              })}
            </Box>
          </Box>

          {/* 직접 추가 */}
          <TextField
            label="직접 추가 (쉼표로 구분)"
            value={customTags}
            onChange={(e) => setCustomTags(e.target.value)}
            fullWidth size="small"
            placeholder="예: After Effects, Notion"
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

/* ── 경력사항 컨텐츠 ─────────────────────────────────────── */
const CAREER_STORAGE_KEY = 'portfolio_careers';

function CareerContent({ careers: initialCareers = [], skills = [] }) {
  const [careers, setCareers] = useState(() => {
    try {
      const stored = localStorage.getItem(CAREER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialCareers;
    } catch {
      return initialCareers;
    }
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const careerReady = useRef(false);

  // 마운트 시 Supabase에서 경력 로드
  useEffect(() => {
    supabase.from('settings').select('value')
      .eq('key', CAREER_STORAGE_KEY).maybeSingle()
      .then(({ data }) => {
        if (data?.value) {
          try {
            const parsed = JSON.parse(data.value);
            setCareers(parsed);
            localStorage.setItem(CAREER_STORAGE_KEY, data.value);
          } catch {}
        }
        careerReady.current = true;
      });
  }, []);

  // 경력 변경 시 Supabase + localStorage 동기화
  useEffect(() => {
    if (!careerReady.current) return;
    const json = JSON.stringify(careers);
    localStorage.setItem(CAREER_STORAGE_KEY, json);
    supabase.from('settings').upsert(
      { key: CAREER_STORAGE_KEY, value: json, updated_at: new Date().toISOString() },
      { onConflict: 'key' }
    ).then(({ error }) => {
      if (error) console.error('[경력] DB 저장 실패:', error.message);
    });
  }, [careers]);

  const handleAdd  = () => { setEditTarget(null); setDialogOpen(true); };
  const handleEdit = (item) => { setEditTarget(item); setDialogOpen(true); };
  const handleDelete = (id) => setCareers((prev) => prev.filter((c) => c.id !== id));
  const handleSave = (saved) => {
    setCareers((prev) =>
      editTarget ? prev.map((c) => c.id === saved.id ? saved : c) : [...prev, saved]
    );
  };

  const getScore = (period) => {
    try {
      const parts = String(period ?? '').split(/[~\-]/).map(s => s.trim()).filter(Boolean);
      const end = parts[parts.length - 1] ?? '';
      if (!end || end.includes('현재')) return 999999;
      const match = end.match(/(\d{4})\.(\d{1,2})/);
      if (!match) return 0;
      return Number(match[1]) * 100 + Number(match[2]);
    } catch {
      return 0;
    }
  };

  const sorted = [...careers].sort((a, b) => getScore(b.period) - getScore(a.period));

  return (
    <Box sx={{ py: 1 }}>
      {sorted.map((item, idx) => (
        <Box key={item.id} sx={{ display: 'flex', gap: { xs: 2, md: 3 }, mb: idx < careers.length - 1 ? 3 : 0 }}>
          {/* 타임라인 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'var(--color-primary)', border: '2px solid var(--color-accent)', mt: '4px', flexShrink: 0 }} />
            {idx < sorted.length - 1 && (
              <Box sx={{ width: 2, flex: 1, bgcolor: 'var(--color-border)', mt: 0.5 }} />
            )}
          </Box>

          {/* 내용 */}
          <Box sx={{ pb: idx < sorted.length - 1 ? 3 : 0, flex: 1, position: 'relative', '&:hover .career-actions': { opacity: 1 } }}>
            {/* 편집/삭제 버튼 */}
            <Box className="career-actions" sx={{ position: 'absolute', top: 0, right: 0, display: 'flex', gap: 0.2, opacity: 0, transition: 'opacity 0.15s' }}>
              <IconButton size="small" onClick={() => handleEdit(item)}
                sx={{ width: 26, height: 26, color: 'var(--color-text-secondary)', '&:hover': { color: 'var(--color-primary)', bgcolor: 'var(--color-accent)' } }}>
                <EditIcon sx={{ fontSize: '0.85rem' }} />
              </IconButton>
              <IconButton size="small" onClick={() => handleDelete(item.id)}
                sx={{ width: 26, height: 26, color: 'var(--color-text-secondary)', '&:hover': { color: '#d32f2f', bgcolor: 'rgba(211,47,47,0.08)' } }}>
                <DeleteIcon sx={{ fontSize: '0.85rem' }} />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 0.5 }}>
              <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-text-primary)' }}>
                {item.company}
              </Typography>
              <Chip label={item.role} size="small"
                sx={{ bgcolor: 'var(--color-accent)', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.7rem', height: 20 }} />
            </Box>
            <Typography sx={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', mb: 1, fontWeight: 500 }}>
              {item.period}
            </Typography>
            <Typography sx={{ fontSize: '0.88rem', color: 'var(--color-text-primary)', lineHeight: 1.7, mb: 1.2 }}>
              {item.description}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7 }}>
              {item.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small"
                  sx={{ bgcolor: 'rgba(123,104,238,0.08)', color: 'var(--color-primary)', fontSize: '0.68rem', height: 20, fontWeight: 600 }} />
              ))}
            </Box>
          </Box>
        </Box>
      ))}

      <Button
        onClick={handleAdd}
        startIcon={<AddIcon />}
        size="small"
        sx={{ mt: careers.length > 0 ? 3 : 0, color: 'var(--color-primary)', fontWeight: 700, textTransform: 'none', '&:hover': { bgcolor: 'var(--color-accent)' } }}
      >
        경력 추가
      </Button>

      <CareerDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSave={handleSave} initialValues={editTarget} skills={skills} />
    </Box>
  );
}

function SectionContent({ section, skills, onSkillsChange }) {
  if (section.id === 'i-am')   return <IAmContent content={section.content} />;
  if (section.id === 'skills') return <SkillsContent skills={skills} onSkillsChange={onSkillsChange} />;
  if (section.id === 'career') return <CareerContent careers={section.careers} skills={skills} />;
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
    <Box sx={{ minHeight: 'calc(100vh - 64px)' }}>

      {/* ─ 프로필 히어로 ─ */}
      <Box sx={{
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(circle, rgba(123,104,238,0.1) 1.5px, transparent 1.5px), linear-gradient(175deg, #C9C0FF 0%, #DDD8FF 22%, #EDE9FF 48%, #F8F6FF 72%, #FFFFFF 100%)',
        backgroundSize: '30px 30px, auto',
        py: { xs: 7, md: 10 },
        borderBottom: '1px solid var(--color-border)',
      }}>
        {/* 소프트 블롭 - 우상단 */}
        <Box sx={{
          position: 'absolute', top: '-20%', right: '-5%',
          width: { xs: 200, md: 380 }, height: { xs: 200, md: 380 },
          borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
          background: 'radial-gradient(circle at 40% 40%, rgba(123,104,238,0.1) 0%, rgba(123,104,238,0.04) 55%, transparent 72%)',
          animation: 'aboutMorphBlob1 12s ease-in-out infinite',
          '@keyframes aboutMorphBlob1': {
            '0%,100%': { borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', transform: 'translateY(0)' },
            '33%':     { borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%', transform: 'translateY(-14px)' },
            '66%':     { borderRadius: '70% 30% 50% 50% / 30% 70% 30% 70%', transform: 'translateY(8px)' },
          },
        }} />

        {/* 소프트 블롭 - 좌하단 */}
        <Box sx={{
          position: 'absolute', bottom: '-20%', left: '-5%',
          width: { xs: 160, md: 300 }, height: { xs: 160, md: 300 },
          borderRadius: '40% 60% 30% 70% / 60% 30% 70% 40%',
          background: 'radial-gradient(circle at 55% 50%, rgba(155,135,245,0.08) 0%, rgba(123,104,238,0.04) 55%, transparent 72%)',
          animation: 'aboutMorphBlob2 15s ease-in-out infinite',
          '@keyframes aboutMorphBlob2': {
            '0%,100%': { borderRadius: '40% 60% 30% 70% / 60% 30% 70% 40%', transform: 'translateY(0)' },
            '50%':     { borderRadius: '60% 40% 50% 50% / 40% 60% 40% 60%', transform: 'translateY(16px)' },
          },
        }} />

        {/* 회전 링 - 좌상단 */}
        <Box sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute', top: '12%', left: '3%',
          width: 90, height: 90,
          borderRadius: '50%',
          border: '1.5px solid transparent',
          borderTop: '1.5px solid rgba(123,104,238,0.3)',
          borderRight: '1.5px solid rgba(123,104,238,0.15)',
          animation: 'aboutSpinBrush 10s linear infinite',
          '@keyframes aboutSpinBrush': { '100%': { transform: 'rotate(360deg)' } },
        }} />


        {/* 컨텐츠 */}
        <Box sx={{ position: 'relative', zIndex: 1, px: { xs: 3, md: 6 } }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 4, md: 8 }} alignItems={{ xs: 'center', md: 'flex-end' }}>
            <ProfilePhoto photo={photo} onPhotoChange={onPhotoChange} />

            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, pb: { md: 1 } }}>
              <Typography variant="h1" sx={{
                fontSize: { xs: '2.8rem', md: '4rem' },
                fontWeight: 900, color: 'var(--color-text-primary)',
                letterSpacing: '-2px', mb: 0.5,
              }}>
                {basicInfo.name}
              </Typography>
              <Typography sx={{
                fontSize: { xs: '1rem', md: '1.15rem' },
                fontWeight: 700, color: '#7B68EE',
                mb: 3, letterSpacing: '4px', textTransform: 'uppercase',
              }}>
                Web Designer
              </Typography>
              {/* 구분선 */}
              <Box sx={{ width: 56, height: 3, bgcolor: '#7B68EE', borderRadius: 2, mb: 4, mx: { xs: 'auto', md: 0 } }} />
              <Grid container spacing={2} alignItems="stretch">
                {infoItems.map(({ icon, label, value }) => (
                  <Grid size={{ xs: 12, sm: 4 }} key={label} sx={{ display: 'flex' }}>
                    <InfoCard icon={icon} label={label} value={value} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* ─ 콘텐츠 탭 ─ */}
      <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 3, md: 6 } }}>
        {/* 폴더 탭 */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
          {sections.map((section, idx) => {
            const active = activeTab === idx;
            return (
              <Box
                key={section.id}
                role="tab"
                tabIndex={0}
                aria-selected={active}
                onClick={() => handleTabChange(null, idx)}
                onKeyDown={(e) => e.key === 'Enter' && handleTabChange(null, idx)}
                sx={{
                  px: { xs: 2, md: 3 },
                  pt: active ? 1.4 : 1.1,
                  pb: 1.2,
                  cursor: 'pointer',
                  borderRadius: '8px 8px 0 0',
                  border: '1.5px solid var(--color-border)',
                  borderBottom: active ? '1.5px solid #ffffff' : '1.5px solid var(--color-border)',
                  bgcolor: active ? '#ffffff' : 'rgba(123,104,238,0.05)',
                  color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  fontWeight: active ? 700 : 600,
                  fontSize: { xs: '0.82rem', md: '0.92rem' },
                  mb: '-1.5px',
                  position: 'relative',
                  zIndex: active ? 2 : 1,
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'background-color 0.15s ease, color 0.15s ease',
                  '&:hover': {
                    bgcolor: active ? '#ffffff' : 'rgba(123,104,238,0.12)',
                    color: 'var(--color-primary)',
                  },
                }}
              >
                {section.title}
              </Box>
            );
          })}
        </Box>

        {/* 콘텐츠 패널 */}
        <Box sx={{
          border: '1.5px solid var(--color-border)',
          borderRadius: '0 8px 8px 8px',
          bgcolor: '#ffffff',
          p: { xs: 3, md: 4 },
          position: 'relative',
          zIndex: 0,
        }}>
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
        </Box>
      </Box>
    </Box>
  );
}

export default AboutMePage;
