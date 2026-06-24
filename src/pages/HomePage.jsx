import { memo, useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Divider, Grid, CircularProgress, Stack, Avatar, Card, CardContent, CardActionArea, Chip, IconButton, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import PaletteIcon from '@mui/icons-material/Palette';
import { aboutMeData, categoryColors } from '../data/aboutMeData';
import ContactInfoCard from '../components/common/ContactInfoCard';
import supabase from '../utils/supabase';

const sectionBase = {
  width: '100%',
  py: { xs: 8, md: 12 },
};

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

/* ── 타이핑 효과 ─────────────────────────────────────── */
function TypingText({ texts }) {
  const [displayed, setDisplayed] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const current = texts[textIdx];
    const tick = () => {
      if (!deleting && charIdx < current.length) {
        setCharIdx(i => i + 1);
        timerRef.current = setTimeout(tick, 100);
      } else if (!deleting && charIdx === current.length) {
        timerRef.current = setTimeout(() => setDeleting(true), 1800);
      } else if (deleting && charIdx > 0) {
        setCharIdx(i => i - 1);
        timerRef.current = setTimeout(tick, 55);
      } else {
        setDeleting(false);
        setTextIdx(i => (i + 1) % texts.length);
      }
    };
    timerRef.current = setTimeout(tick, deleting ? 55 : 100);
    return () => clearTimeout(timerRef.current);
  }, [charIdx, deleting, textIdx, texts]);

  useEffect(() => {
    setDisplayed(texts[textIdx].slice(0, charIdx));
  }, [charIdx, textIdx, texts]);

  return (
    <Box component="span">
      {displayed}
      <Box component="span" sx={{
        display: 'inline-block', width: '2px', height: '0.85em',
        bgcolor: '#7B68EE', ml: '3px', verticalAlign: 'middle',
        animation: 'cursorBlink 1s step-end infinite',
        '@keyframes cursorBlink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
      }} />
    </Box>
  );
}

/* ── Hero 섹션 ─────────────────────────────────────── */
function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);

  const handleDotsClick = () => {
    setTransitioning(true);
    setTimeout(() => navigate('/projects'), 650);
  };

  const fadeUp = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <Box sx={{
      position: 'relative', overflow: 'hidden',
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      background: 'radial-gradient(circle, rgba(123,104,238,0.1) 1.5px, transparent 1.5px), linear-gradient(175deg, #C9C0FF 0%, #DDD8FF 22%, #EDE9FF 48%, #F8F6FF 72%, #FFFFFF 100%)',
      backgroundSize: '30px 30px, auto',
    }}>
      {/* 페이지 전환 오버레이 */}
      {transitioning && (
        <Box sx={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'linear-gradient(135deg, #7B68EE, #5B4FCF)',
          animation: 'rippleExpand 0.65s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          '@keyframes rippleExpand': {
            '0%':   { clipPath: 'circle(0% at 88% 82%)' },
            '100%': { clipPath: 'circle(160% at 88% 82%)' },
          },
        }} />
      )}
      {/* ── 배경 장식 ── */}
      {/* 소프트 블롭 - 우상단 */}
      <Box sx={{
        position: 'absolute', top: '-8%', right: '-6%',
        width: { xs: 280, sm: 420, md: 620 }, height: { xs: 280, sm: 420, md: 620 },
        borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
        background: 'radial-gradient(circle at 40% 40%, rgba(123,104,238,0.5) 0%, rgba(123,104,238,0.22) 50%, transparent 72%)',
        filter: 'blur(2px)',
        animation: 'morphBlob1 12s ease-in-out infinite',
        '@keyframes morphBlob1': {
          '0%,100%': { borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', transform: 'translateY(0)' },
          '33%':     { borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%', transform: 'translateY(-18px)' },
          '66%':     { borderRadius: '70% 30% 50% 50% / 30% 70% 30% 70%', transform: 'translateY(10px)' },
        },
      }} />

      {/* 소프트 블롭 - 좌하단 */}
      <Box sx={{
        position: 'absolute', bottom: '-12%', left: '-6%',
        width: { xs: 240, sm: 360, md: 520 }, height: { xs: 240, sm: 360, md: 520 },
        borderRadius: '40% 60% 30% 70% / 60% 30% 70% 40%',
        background: 'radial-gradient(circle at 55% 50%, rgba(155,135,245,0.45) 0%, rgba(123,104,238,0.2) 50%, transparent 72%)',
        filter: 'blur(2px)',
        animation: 'morphBlob2 15s ease-in-out infinite',
        '@keyframes morphBlob2': {
          '0%,100%': { borderRadius: '40% 60% 30% 70% / 60% 30% 70% 40%', transform: 'translateY(0)' },
          '50%':     { borderRadius: '60% 40% 50% 50% / 40% 60% 40% 60%', transform: 'translateY(20px)' },
        },
      }} />

      {/* 회전 링 - 좌측 */}
      <Box sx={{
        display: { xs: 'none', md: 'block' },
        position: 'absolute', top: '22%', left: '4%',
        width: 130, height: 130,
        borderRadius: '50%',
        border: '1.5px solid transparent',
        borderTop: '1.5px solid rgba(123,104,238,0.55)',
        borderRight: '1.5px solid rgba(123,104,238,0.28)',
        animation: 'spinBrush 10s linear infinite',
        '@keyframes spinBrush': { '100%': { transform: 'rotate(360deg)' } },
      }} />

      {/* 중앙 글로우 */}
      <Box sx={{
        position: 'absolute', top: '44%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: 360, md: 680 }, height: { xs: 260, md: 500 },
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(123,104,238,0.22) 0%, rgba(123,104,238,0.08) 50%, transparent 72%)',
        filter: 'blur(48px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* 인터랙티브 도트 - 우하단 */}
      <Box
        onClick={handleDotsClick}
        sx={{
          display: { xs: 'none', sm: 'flex' },
          position: 'absolute', bottom: '14%', right: '6%',
          zIndex: 2,
          flexDirection: 'column', gap: '10px',
          cursor: 'pointer',
          '&:hover .dot': { transform: 'scale(1.35)', filter: 'brightness(1.2)' },
          '@keyframes dotBounce0': { '0%,100%': { transform: 'translateY(0)' }, '40%': { transform: 'translateY(-16px)' } },
          '@keyframes dotBounce1': { '0%,100%': { transform: 'translateY(0)' }, '40%': { transform: 'translateY(-16px)' } },
          '@keyframes dotBounce2': { '0%,100%': { transform: 'translateY(0)' }, '40%': { transform: 'translateY(-16px)' } },
          '@keyframes dotBounce3': { '0%,100%': { transform: 'translateY(0)' }, '40%': { transform: 'translateY(-16px)' } },
        }}
      >
        {[
          { color: '#7B68EE', size: 22, delay: '0s' },
          { color: '#9D8FF2', size: 17, delay: '0.15s' },
          { color: '#B8AEFF', size: 19, delay: '0.3s' },
          { color: '#D4CDFF', size: 14, delay: '0.45s' },
        ].reduce((rows, dot, i) => {
          if (i % 2 === 0) rows.push([]);
          rows[rows.length - 1].push(dot);
          return rows;
        }, []).map((row, ri) => (
          <Box key={ri} sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {row.map((dot, ci) => {
              const idx = ri * 2 + ci;
              return (
                <Box
                  key={ci}
                  className="dot"
                  sx={{
                    width: dot.size, height: dot.size,
                    borderRadius: '50%',
                    bgcolor: dot.color,
                    boxShadow: `0 0 ${dot.size}px ${dot.color}bb`,
                    animation: `dotBounce${idx} 1.6s ease-in-out ${dot.delay} infinite`,
                    transition: 'transform 0.2s ease, filter 0.2s ease',
                  }}
                />
              );
            })}
          </Box>
        ))}
      </Box>

      {/* ── 메인 콘텐츠 ── */}
      <Box sx={{
        position: 'relative', zIndex: 1, textAlign: 'center',
        pt: { xs: 12, sm: 14, md: 16 },
        pb: { xs: 10, sm: 12, md: 14 },
        px: { xs: 3, md: 6 },
        width: '100%',
      }}>

        {/* 이름 */}
        <Typography variant="h1" sx={{
          fontSize: { xs: '3rem', sm: '4.5rem', md: '5.5rem', lg: '6.5rem' },
          fontWeight: 900,
          letterSpacing: { xs: '-1px', sm: '-2px', md: '-3px' },
          lineHeight: 1, mb: 2,
          color: '#111111',
          ...fadeUp(0.25),
        }}>
          장지은
        </Typography>

        {/* 타이핑 역할 */}
        <Typography sx={{
          fontSize: { xs: '0.95rem', sm: '1.2rem', md: '1.5rem', lg: '1.7rem' },
          fontWeight: 700,
          letterSpacing: { xs: '2px', sm: '3px', md: '4px' },
          textTransform: 'uppercase',
          color: '#111111', mb: { xs: 3, md: 5 },
          minHeight: { xs: '1.6rem', sm: '2rem', md: '2.6rem' },
          ...fadeUp(0.4),
        }}>
          <TypingText texts={['Web Designer', '6년차 디자이너', 'Freelancer']} />
        </Typography>

        {/* 애니메이션 구분선 */}
        <Box sx={{
          height: 3, bgcolor: '#7B68EE', mx: 'auto',
          mb: { xs: 3, md: 5 }, borderRadius: 2,
          width: visible ? 60 : 0,
          transition: 'width 0.9s ease 0.55s',
        }} />

        {/* 헤드라인 */}
        <Typography sx={{
          fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem' },
          color: '#888888',
          lineHeight: { xs: 1.9, md: 2.1 },
          maxWidth: { xs: '100%', md: 520 },
          mx: 'auto', mb: { xs: 5, md: 7 },
          wordBreak: 'keep-all',
          px: { xs: 1, sm: 0 },
          ...fadeUp(0.65),
        }}>
          회사에서만 6년, 프리랜서로도 꾸준히!<br />
          상세페이지, 배너, 쇼핑몰 관리, 간단한 영상까지<br />
          <Box component="span" sx={{
            color: '#111111', fontWeight: 900,
            fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem', lg: '2rem' },
            letterSpacing: '-0.5px',
          }}>
            웬만한 건 다 해요.
          </Box>
        </Typography>

        {/* ── CTA 버튼 ── */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1.5, sm: 2 },
          justifyContent: 'center',
          alignItems: 'center',
          ...fadeUp(0.8),
        }}>
          <Button
            variant="contained"
            onClick={handleDotsClick}
            sx={{
              bgcolor: '#7B68EE', color: '#fff',
              width: { xs: '100%', sm: 'auto' },
              maxWidth: { xs: 320, sm: 'none' },
              px: { xs: 3, sm: 5 },
              py: { xs: '12px', sm: '13px' },
              minHeight: 48,
              borderRadius: 2, fontWeight: 700,
              textTransform: 'none',
              fontSize: { xs: '0.95rem', sm: '1rem' },
              boxShadow: '0 4px 20px rgba(123,104,238,0.3)',
              transition: 'all 0.22s ease',
              '&:hover': {
                bgcolor: '#5B4FCF', transform: 'translateY(-3px)',
                boxShadow: '0 10px 32px rgba(123,104,238,0.45)',
              },
            }}
          >
            포트폴리오 둘러보기
          </Button>

          <Button
            variant="outlined"
            onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
            startIcon={<EmailIcon />}
            sx={{
              borderColor: 'rgba(123,104,238,0.4)', color: '#7B68EE',
              width: { xs: '100%', sm: 'auto' },
              maxWidth: { xs: 320, sm: 'none' },
              px: { xs: 3, sm: 5 },
              py: { xs: '12px', sm: '13px' },
              minHeight: 48,
              borderRadius: 2, fontWeight: 700,
              textTransform: 'none',
              fontSize: { xs: '0.95rem', sm: '1rem' },
              transition: 'all 0.22s ease',
              '&:hover': {
                bgcolor: '#F0EEFF',
                borderColor: '#7B68EE',
                transform: 'translateY(-3px)',
              },
            }}
          >
            연락하기
          </Button>
        </Box>

        {/* ── 스크롤 유도 ── */}
        <Box sx={{
          mt: { xs: 6, sm: 8 },
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5,
          opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 1.3s',
          cursor: 'pointer',
          '&:hover .arrow-icon': { transform: 'translateY(4px)' },
        }}
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
        >
          <Typography sx={{
            fontSize: '0.6rem', color: 'rgba(0,0,0,0.25)',
            letterSpacing: '3px', textTransform: 'uppercase',
          }}>
            Scroll
          </Typography>
          <KeyboardArrowDownIcon className="arrow-icon" sx={{
            color: 'rgba(123,104,238,0.4)', fontSize: '1.8rem',
            transition: 'transform 0.3s ease',
            animation: 'bounce 2s ease-in-out infinite',
            '@keyframes bounce': {
              '0%,100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(6px)' },
            },
          }} />
        </Box>
      </Box>
    </Box>
  );
}

/* ── About Me 섹션 ─────────────────────────────────── */
function AboutSection({ photo }) {
  const { basicInfo, sections } = aboutMeData;
  const iAmSection = sections.find((s) => s.showInHome && s.id === 'i-am');

  return (
    <Box sx={{ width: '100%', pt: { xs: 8, md: 12 }, pb: { xs: 4, md: 6 } }}>
      <Container maxWidth="md">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 6, md: 8 }}
          alignItems="flex-start"
        >
          {/* 왼쪽: 프로필 사진 + 이름 */}
          <Box sx={{ flexShrink: 0, alignSelf: { xs: 'center', md: 'flex-start' }, textAlign: 'center' }}>
            <Box
              sx={{
                width: { xs: 240, md: 300 },
                borderRadius: 3,
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                boxShadow: '0 16px 48px rgba(123,104,238,0.14)',
              }}
            >
              {photo ? (
                <Box
                  component="img"
                  src={photo}
                  alt="프로필 사진"
                  sx={{ width: '100%', display: 'block', objectFit: 'contain' }}
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '3/4',
                    bgcolor: 'var(--color-accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <PersonIcon sx={{ fontSize: '7rem', color: 'var(--color-primary)' }} />
                </Box>
              )}
            </Box>
            <Typography sx={{
              mt: 2.5,
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              fontWeight: 900,
              letterSpacing: '-0.5px',
              color: 'var(--color-text-primary)',
            }}>
              {basicInfo.name}
            </Typography>
          </Box>

          {/* 오른쪽: 텍스트 */}
          <Box sx={{ flex: 1 }}>
            {/* 직함 + 카드 */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)', mb: 2 }}>
                Web Designer
              </Typography>
              <Grid container spacing={1.5}>
                {[
                  { icon: <SchoolIcon fontSize="small" />, label: '학력', value: basicInfo.education },
                  { icon: <PaletteIcon fontSize="small" />, label: '전공', value: basicInfo.major },
                  { icon: <WorkIcon fontSize="small" />,   label: '경력', value: basicInfo.experience },
                ].map(({ icon, label, value }) => (
                  <Grid size={{ xs: 12, sm: 4 }} key={label}>
                    <Box
                      sx={{
                        bgcolor: 'var(--color-bg-soft)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 2, px: 1.5, py: 1,
                      }}
                    >
                      <Stack direction="row" spacing={0.7} alignItems="center" sx={{ mb: 0.5 }}>
                        <Box sx={{ color: 'var(--color-primary)', display: 'flex', flexShrink: 0 }}>{icon}</Box>
                        <Typography noWrap sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-secondary)', letterSpacing: '0.5px' }}>
                          {label}
                        </Typography>
                      </Stack>
                      <Box sx={{ pl: '26px', overflow: 'hidden' }}>
                        <Typography noWrap sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                          {value}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {iAmSection && (
              <Box sx={{ mb: 4 }}>
                {/* 큰 I AM 텍스트 */}
                <Typography
                  sx={{
                    fontSize: { xs: '2.8rem', md: '3.8rem' },
                    fontWeight: 900,
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                    letterSpacing: '-1.5px',
                    userSelect: 'none',
                  }}
                >
                  I AM
                </Typography>
                <Box sx={{ width: 44, height: 4, bgcolor: 'var(--color-primary)', mt: 1, mb: 3, borderRadius: 2 }} />

                <Stack spacing={2}>
                  {iAmSection.content.map((phrase, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                          bgcolor: idx === iAmSection.content.length - 1
                            ? 'var(--color-primary)'
                            : 'var(--color-accent)',
                        }}
                      />
                      <Typography sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {phrase}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}

            <Button
              variant="contained"
              href="/my-portfolio/about"
              sx={{
                bgcolor: 'var(--color-button-primary)',
                '&:hover': { bgcolor: 'var(--color-button-hover)' },
                px: 4, py: 1.2, borderRadius: 2, fontWeight: 700, textTransform: 'none',
              }}
            >
              더 알아보기
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

/* ── Skill Tree 섹션 ───────────────────────────────── */
const SkillSection = memo(function SkillSection({ skills }) {
  const [animated, setAnimated] = useState(false);
  const categoryOrder = ['Design', 'Frontend', 'Framework', '기타'];
  const homeSkills = useMemo(() =>
    skills
      .filter((s) => s.showInHome)
      .sort((a, b) => {
        const catDiff = categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
        return catDiff !== 0 ? catDiff : b.level - a.level;
      }),
    [skills]
  );

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <Box sx={{ width: '100%', pt: { xs: 4, md: 6 }, pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Box sx={{ width: 40, height: 4, bgcolor: '#7B68EE', mx: 'auto', mb: 1.5, borderRadius: 1 }} />
          <Typography variant="h2" sx={{ color: 'var(--color-text-primary)', fontWeight: 800 }}>
            주요 스킬
          </Typography>
        </Box>
        <Box sx={{ mb: 6 }} />

        <Stack spacing={2.5} sx={{ mb: 6 }}>
          {homeSkills.map((skill, idx) => {
            const color = categoryColors[skill.category] ?? '#999';
            return (
              <Box key={skill.id}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color, flexShrink: 0 }} />
                    <Box sx={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>
                      {skill.name}
                    </Box>
                    <Box sx={{ fontSize: '0.65rem', fontWeight: 700, color }}>
                      {skill.category}
                    </Box>
                  </Box>
                  <Box sx={{ fontSize: '0.9rem', fontWeight: 800, color, flexShrink: 0, ml: 2 }}>
                    {skill.level}%
                  </Box>
                </Box>
                <Box sx={{ bgcolor: 'rgba(0,0,0,0.07)', borderRadius: 4, height: 10, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      width: animated ? `${skill.level}%` : '0%',
                      height: '100%',
                      borderRadius: 4,
                      bgcolor: color,
                      transition: `width 0.9s ease-out ${idx * 100}ms`,
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            component={Link}
            to="/about?tab=1"
            variant="outlined"
            sx={{
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)',
              px: 4, py: 1.2, borderRadius: 2, fontWeight: 700, textTransform: 'none',
              boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
              '&:hover': { bgcolor: 'var(--color-accent)', borderColor: 'var(--color-primary)', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' },
            }}
          >
            더 알아보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
});

/* ── Projects 미리보기 카드 ────────────────────────── */
const THUM_BASE = 'https://image.thum.io/get/width/600/crop/800';

function HomeProjectCard({ project }) {
  const thumbnailSrc = project.thumbnail_url
    || (project.detail_url ? `${THUM_BASE}/${project.detail_url}` : null);

  const href = project.detail_url || project.github_url
    || (project.category === '상세페이지' ? project.thumbnail_url : null);

  return (
    <Card
      sx={{
        height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
        borderRadius: 3, overflow: 'hidden',
        bgcolor: '#ffffff',
        border: '1px solid var(--color-border)',
        boxShadow: 'none',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 32px rgba(123,104,238,0.18)',
          borderColor: 'var(--color-primary)',
        },
      }}
    >
      <CardActionArea
        component={href ? 'a' : 'div'}
        href={href || undefined}
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
        sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'stretch',
          height: '100%', flexGrow: 1,
          '& .MuiCardActionArea-focusHighlight': { display: 'none' },
        }}
      >
        {/* 썸네일 */}
        <Box sx={{ position: 'relative', width: '100%', paddingTop: '133.33%', overflow: 'hidden' }}>
          {thumbnailSrc ? (
            <Box
              component="img"
              src={thumbnailSrc}
              alt={project.title}
              loading="lazy"
              sx={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'top',
                transition: 'transform 0.35s ease',
                '.MuiCardActionArea-root:hover &': { transform: 'scale(1.04)' },
              }}
            />
          ) : (
            <Box sx={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              background: 'linear-gradient(135deg, #F0EEFF 0%, #E4DFFF 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Typography sx={{ color: 'var(--color-primary)', fontSize: '0.85rem', textAlign: 'center', px: 2, fontWeight: 600 }}>
                {project.title}
              </Typography>
            </Box>
          )}
          {/* 호버 오버레이 */}
          {href && (
            <Box sx={{
              position: 'absolute', inset: 0,
              bgcolor: 'rgba(91,79,207,0.75)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: 0, transition: 'opacity 0.25s ease',
              '.MuiCardActionArea-root:hover &': { opacity: 1 },
            }}>
              <Box sx={{
                fontSize: '0.75rem', fontWeight: 700, color: '#fff',
                border: '1px solid rgba(255,255,255,0.8)',
                borderRadius: 1.5, px: 1.8, py: 0.6, letterSpacing: '0.5px',
              }}>
                {project.category === '상세페이지' ? '전체 보기 →' : '바로가기 →'}
              </Box>
            </Box>
          )}
        </Box>

        {/* 텍스트 영역 */}
        <CardContent sx={{ p: { xs: 1.4, sm: 1.8 }, flexGrow: 1, bgcolor: '#ffffff' }}>
          <Typography sx={{
            fontWeight: 700, color: '#111111',
            mb: 0.8, fontSize: { xs: '0.82rem', sm: '0.95rem' }, lineHeight: 1.4,
          }}>
            {project.title}
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {project.tech_stack?.slice(0, 2).map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{ bgcolor: 'rgba(123,104,238,0.1)', color: '#7B68EE', fontSize: { xs: '0.55rem', sm: '0.6rem' }, height: 18, fontWeight: 600 }}
              />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

/* ── Projects 섹션 ─────────────────────────────────── */
function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const CATEGORY_ORDER = { '상세페이지': 0, 'UI디자인': 1, '바이브코딩': 2 };

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .eq('is_published', true)
          .order('sort_order', { ascending: true });
        const sorted = (data || [])
          .sort((a, b) => (CATEGORY_ORDER[a.category] ?? 99) - (CATEGORY_ORDER[b.category] ?? 99))
          .slice(0, 3);
        setProjects(sorted);
      } catch (e) {
        console.error('[Projects] fetch error:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <Box id="projects-section" sx={{ ...sectionBase, background: 'radial-gradient(circle, rgba(123,104,238,0.07) 1.5px, transparent 1.5px), linear-gradient(160deg, #F5F3FF 0%, #EDE9FF 50%, #F5F3FF 100%)', backgroundSize: '30px 30px, auto' }}>
      <Box sx={{ px: { xs: 3, md: 6 } }}>
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Box sx={{ width: 40, height: 4, bgcolor: '#7B68EE', mx: 'auto', mb: 1.5, borderRadius: 1 }} />
          <Typography variant="h2" sx={{ color: 'var(--color-text-primary)', fontWeight: 800 }}>
            프로젝트
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)', mb: 6, textAlign: 'center' }}>
          대표 작업물을 소개합니다.
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress sx={{ color: 'var(--color-primary)' }} />
          </Box>
        ) : projects.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              등록된 프로젝트가 없습니다.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ mb: 6, pt: 1 }}>
            <Grid container spacing={{ xs: 1.5, sm: 3 }}>
              {projects.map((project) => (
                <Grid size={{ xs: 6, sm: 6, md: 4 }} key={project.id} sx={{ display: 'flex' }}>
                  <HomeProjectCard project={project} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            component={Link}
            to="/projects"
            variant="outlined"
            onClick={() => window.scrollTo(0, 0)}
            sx={{
              color: 'var(--color-primary)',
              borderColor: 'rgba(123,104,238,0.4)',
              px: 4, py: 1.2, borderRadius: 2, fontWeight: 700, textTransform: 'none',
              transition: 'all 0.22s ease',
              '&:hover': { bgcolor: 'var(--color-accent)', borderColor: 'var(--color-primary)' },
            }}
          >
            더 알아보기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

/* ── Contact 섹션 ──────────────────────────────────── */
function ContactSection() {

  return (
    <Box id="contact-section" sx={{ ...sectionBase }}>
      <Container maxWidth="md">
        {/* 섹션 타이틀 */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box sx={{ width: 40, height: 4, bgcolor: '#7B68EE', mx: 'auto', mb: 1.5, borderRadius: 1 }} />
          <Typography variant="h2" sx={{ color: 'var(--color-text-primary)' }}>
            연락하기
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)', mt: 1 }}>
            편하게 연락주세요.
          </Typography>
        </Box>

        {/* 연락처 카드 */}
        <ContactInfoCard />
      </Container>
    </Box>
  );
}

function HomePage({ photo, skills }) {
  return (
    <Box>
      <HeroSection />
      <Divider sx={{ borderColor: 'var(--color-border)' }} />
      <Box>
        <AboutSection photo={photo} />
        <SkillSection skills={skills} />
      </Box>
      <Divider sx={{ borderColor: 'var(--color-border)' }} />
      <ProjectsSection />
      <Divider sx={{ borderColor: 'var(--color-border)' }} />
      <ContactSection />
    </Box>
  );
}

export default HomePage;
