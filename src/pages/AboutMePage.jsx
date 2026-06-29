import { memo, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box, Typography, Card, Stack,
  Avatar, Chip,
  Grid, Tooltip,
} from '@mui/material';
import CameraAltIcon        from '@mui/icons-material/CameraAlt';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
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
          width: { xs: 160, md: 200 },
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
        background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(237,233,255,0.6) 100%)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(123,104,238,0.18)',
        borderRadius: 3,
        px: { xs: 2, sm: 2.5 },
        py: { xs: 2.5, sm: 5 },
        width: '100%', height: '100%', textAlign: 'left',
        boxShadow: '0 4px 24px rgba(123,104,238,0.10), inset 0 1px 0 rgba(255,255,255,0.8)',
        transition: 'box-shadow 0.2s ease',
        '&:hover': { boxShadow: '0 8px 32px rgba(123,104,238,0.18), inset 0 1px 0 rgba(255,255,255,0.8)' },
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
const SkillCard = memo(function SkillCard({ skill, animated, delay }) {
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
          transition: 'box-shadow 0.2s, transform 0.2s',
          cursor: 'default',
          '&:hover': { boxShadow: '0 4px 20px rgba(123,104,238,0.12)', transform: 'translateY(-2px)' },
          '&:focus-visible': { outline: '2px solid var(--color-primary)', outlineOffset: 2 },
        }}
      >
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

/* ── 스킬 섹션 ────────────────────────────────────────────── */
function SkillsContent({ skills }) {
  const [filter, setFilter] = useState('전체');
  const [animated, setAnimated] = useState(false);

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


/* ── 자격증 컨텐츠 ───────────────────────────────────────── */
const CERT_STORAGE_KEY = 'portfolio_certificates';

function CertificatesContent() {
  const [certs, setCerts] = useState(() => {
    try {
      const stored = localStorage.getItem(CERT_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  useEffect(() => {
    supabase.from('settings').select('value')
      .eq('key', CERT_STORAGE_KEY).maybeSingle()
      .then(({ data }) => {
        if (data?.value) {
          try {
            const parsed = JSON.parse(data.value);
            setCerts(parsed);
            localStorage.setItem(CERT_STORAGE_KEY, data.value);
          } catch {}
        }
      });
  }, []);

  if (certs.length === 0) {
    return (
      <Box sx={{ py: 6, textAlign: 'center', color: 'var(--color-text-muted)' }}>
        <WorkspacePremiumIcon sx={{ fontSize: '3rem', opacity: 0.3, mb: 1 }} />
        <Typography sx={{ fontSize: '0.95rem' }}>등록된 자격증이 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      <Stack spacing={2}>
        {certs.map((cert) => (
          <Box
            key={cert.id}
            sx={{
              display: 'flex', alignItems: 'center', gap: 2,
              p: 2, borderRadius: 2,
              border: '1px solid var(--color-border)',
              bgcolor: 'var(--color-bg-soft)',
            }}
          >
            <Box sx={{
              width: 40, height: 40, borderRadius: 2, flexShrink: 0,
              bgcolor: 'rgba(123,104,238,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-primary)',
            }}>
              <WorkspacePremiumIcon fontSize="small" />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>
                {cert.name}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {cert.issuer && (
                  <Typography sx={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                    {cert.issuer}
                  </Typography>
                )}
                {cert.date && (
                  <Typography sx={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                    {cert.date}
                  </Typography>
                )}
              </Stack>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

/* ── 근무 기간 계산 ───────────────────────────────────────── */
function calcDuration(period) {
  try {
    const parts = String(period ?? '').split(/[~\-–]/).map((s) => s.trim()).filter(Boolean);
    if (parts.length < 2) return '';
    const parseYM = (str) => {
      if (str.includes('현재')) {
        const now = new Date();
        return { y: now.getFullYear(), m: now.getMonth() + 1 };
      }
      const match = str.match(/(\d{4})\.(\d{1,2})/);
      if (!match) return null;
      return { y: Number(match[1]), m: Number(match[2]) };
    };
    const start = parseYM(parts[0]);
    const end   = parseYM(parts[parts.length - 1]);
    if (!start || !end) return '';
    const total = (end.y - start.y) * 12 + (end.m - start.m) + 1;
    if (total <= 0) return '';
    const years  = Math.floor(total / 12);
    const months = total % 12;
    if (years === 0) return `${months}개월`;
    if (months === 0) return `${years}년`;
    return `${years}년 ${months}개월`;
  } catch {
    return '';
  }
}

/* ── 경력사항 컨텐츠 ─────────────────────────────────────── */
const CAREER_STORAGE_KEY = 'portfolio_careers';

function CareerContent({ careers: initialCareers = [], skills = [] }) {
  const skillColorMap = useMemo(
    () => Object.fromEntries(skills.map((s) => [s.name, categoryColors[s.category] ?? null])),
    [skills]
  );
  const [careers, setCareers] = useState(() => {
    try {
      const stored = localStorage.getItem(CAREER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialCareers;
    } catch {
      return initialCareers;
    }
  });
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
      });
  }, []);

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
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#BDBDBD', border: '2px solid #E0E0E0', mt: '4px', flexShrink: 0 }} />
            {idx < sorted.length - 1 && (
              <Box sx={{ width: 2, flex: 1, bgcolor: '#E0E0E0', mt: 0.5 }} />
            )}
          </Box>

          {/* 내용 */}
          <Box sx={{ pb: idx < sorted.length - 1 ? 3 : 0, flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 0.5 }}>
              <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-text-primary)' }}>
                {item.company}
              </Typography>
              <Chip label={item.role} size="small"
                sx={{ bgcolor: 'rgba(0,0,0,0.08)', color: '#222222', fontWeight: 700, fontSize: '0.7rem', height: 20 }} />
            </Box>
            <Typography sx={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', mb: 1, fontWeight: 500 }}>
              {item.period}
              {calcDuration(item.period) && (
                <Box component="span" sx={{ ml: 1, color: '#222222', fontWeight: 700 }}>
                  ({calcDuration(item.period)})
                </Box>
              )}
            </Typography>
            <Typography sx={{ fontSize: '0.88rem', color: 'var(--color-text-primary)', lineHeight: 1.7, mb: 1.2 }}>
              {item.description}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7 }}>
              {item.tags.map((tag) => {
                const c = skillColorMap[tag] ?? '#7B68EE';
                return (
                  <Chip key={tag} label={tag} size="small"
                    sx={{ bgcolor: `${c}18`, color: c, fontSize: '0.68rem', height: 20, fontWeight: 600 }} />
                );
              })}
            </Box>
          </Box>
        </Box>
      ))}


    </Box>
  );
}

function SectionContent({ section, skills }) {
  if (section.id === 'i-am')          return <IAmContent content={section.content} />;
  if (section.id === 'skills')        return <SkillsContent skills={skills} />;
  if (section.id === 'certificates')  return <CertificatesContent />;
  if (section.id === 'career')        return <CareerContent careers={section.careers} skills={skills} />;
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
        background: 'radial-gradient(circle, rgba(123,104,238,0.1) 1.5px, transparent 1.5px), linear-gradient(175deg, #C9C0FF 0%, #DDD8FF 22%, #EDE9FF 48%, #F8F6FF 72%, #F5F3FF 100%)',
        backgroundSize: '28px 28px, auto',
        py: { xs: 7, md: 10 },
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
