import { memo, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Divider, Grid, CircularProgress, Stack, Avatar, Card, CardContent, Chip, IconButton, Tooltip } from '@mui/material';
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
import GuestbookForm from '../components/common/GuestbookForm';
import GuestbookCard from '../components/common/GuestbookCard';
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
        bgcolor: '#FF2D55', ml: '3px', verticalAlign: 'middle',
        animation: 'cursorBlink 1s step-end infinite',
        '@keyframes cursorBlink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
      }} />
    </Box>
  );
}

/* ── Hero 섹션 ─────────────────────────────────────── */
function HeroSection() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);

  const fadeUp = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <Box sx={{
      position: 'relative', overflow: 'hidden',
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      background: 'linear-gradient(145deg, #0d1333 0%, #1a1650 45%, #0e2454 100%)',
    }}>
      {/* ── 배경 장식 ── */}

      {/* 도트 그리드 */}
      <Box sx={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
      }} />

      {/* 글로우 원 - 우상단 */}
      <Box sx={{
        position: 'absolute', top: '-8%', right: '-8%',
        width: { xs: 280, md: 520 }, height: { xs: 280, md: 520 },
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,45,85,0.18) 0%, transparent 68%)',
        animation: 'glow1 9s ease-in-out infinite',
        '@keyframes glow1': {
          '0%,100%': { transform: 'scale(1) translateY(0)' },
          '50%': { transform: 'scale(1.08) translateY(-24px)' },
        },
      }} />

      {/* 글로우 원 - 좌하단 */}
      <Box sx={{
        position: 'absolute', bottom: '-12%', left: '-8%',
        width: { xs: 240, md: 440 }, height: { xs: 240, md: 440 },
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(30,58,110,0.45) 0%, transparent 68%)',
        animation: 'glow2 12s ease-in-out infinite',
        '@keyframes glow2': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(20px)' },
        },
      }} />

      {/* 회전 사각형 - 우하단 */}
      <Box sx={{
        position: 'absolute', bottom: '15%', right: '8%',
        width: { xs: 60, md: 90 }, height: { xs: 60, md: 90 },
        border: '2px solid rgba(255,45,85,0.25)',
        borderRadius: '8px',
        animation: 'spin 18s linear infinite',
        '@keyframes spin': { '100%': { transform: 'rotate(360deg)' } },
      }} />

      {/* 링 - 좌상단 */}
      <Box sx={{
        position: 'absolute', top: '18%', left: '4%',
        width: { xs: 80, md: 130 }, height: { xs: 80, md: 130 },
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.08)',
        animation: 'float 7s ease-in-out infinite',
        '@keyframes float': {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(20deg)' },
        },
      }} />

      {/* 작은 링 - 중앙 우측 */}
      <Box sx={{
        position: 'absolute', top: '55%', right: '12%',
        width: { xs: 36, md: 56 }, height: { xs: 36, md: 56 },
        borderRadius: '50%',
        border: '1px solid rgba(255,45,85,0.3)',
        animation: 'float2 5s ease-in-out infinite',
        '@keyframes float2': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(14px)' },
        },
      }} />

      {/* 수평 라인 장식 */}
      <Box sx={{
        position: 'absolute', top: '42%', left: 0,
        width: '12%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,45,85,0.4))',
        display: { xs: 'none', md: 'block' },
      }} />
      <Box sx={{
        position: 'absolute', top: '42%', right: 0,
        width: '12%', height: '1px',
        background: 'linear-gradient(270deg, transparent, rgba(255,45,85,0.4))',
        display: { xs: 'none', md: 'block' },
      }} />

      {/* ── 메인 콘텐츠 ── */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center', py: { xs: 14, md: 18 } }}>

        {/* PORTFOLIO 라벨 */}
        <Box sx={{ mb: 4, ...fadeUp(0.1) }}>
          <SectionLabel text="Portfolio" />
        </Box>

        {/* 이름 */}
        <Typography variant="h1" sx={{
          fontSize: { xs: '3.8rem', md: '6.5rem' },
          fontWeight: 900, letterSpacing: '-3px', lineHeight: 1,
          color: '#ffffff', mb: 2,
          textShadow: '0 4px 32px rgba(255,45,85,0.25)',
          ...fadeUp(0.25),
        }}>
          장지은
        </Typography>

        {/* 타이핑 역할 */}
        <Typography sx={{
          fontSize: { xs: '1.2rem', md: '1.7rem' },
          fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase',
          color: '#FF2D55', mb: 5, minHeight: { xs: '2rem', md: '2.6rem' },
          ...fadeUp(0.4),
        }}>
          <TypingText texts={['Web Designer', '6년차 디자이너', 'Freelancer']} />
        </Typography>

        {/* 애니메이션 구분선 */}
        <Box sx={{
          height: 3, bgcolor: '#FF2D55', mx: 'auto', mb: 5, borderRadius: 2,
          width: visible ? 72 : 0,
          transition: 'width 0.9s ease 0.55s',
        }} />

        {/* 헤드라인 */}
        <Typography sx={{
          fontSize: { xs: '1.05rem', md: '1.3rem' },
          color: 'rgba(255,255,255,0.78)', lineHeight: 2.1,
          maxWidth: 580, mx: 'auto', mb: 7, wordBreak: 'keep-all',
          ...fadeUp(0.65),
        }}>
          회사에서만 6년, 프리랜서로도 꾸준히!<br />
          상세페이지, 배너, 쇼핑몰 관리, 간단한 영상까지<br />
          <Box component="span" sx={{
            color: '#FF2D55', fontWeight: 900,
            fontSize: { xs: '1.5rem', md: '2rem' }, letterSpacing: '-0.5px',
          }}>
            웬만한 건 다 해요.
          </Box>
        </Typography>

        {/* ── CTA 버튼 ── */}
        <Box sx={{
          display: 'flex', flexDirection: { xs: 'column', sm: 'row' },
          gap: 2, justifyContent: 'center', alignItems: 'center',
          ...fadeUp(0.8),
        }}>
          {/* Primary CTA */}
          <Button
            component={Link} to="/projects" variant="contained"
            sx={{
              bgcolor: '#FF2D55', color: '#fff',
              px: { xs: 4, sm: 5 }, py: 1.6, borderRadius: 2, fontWeight: 700,
              textTransform: 'none', fontSize: '1rem',
              boxShadow: '0 4px 20px rgba(255,45,85,0.4)',
              transition: 'all 0.22s ease',
              '&:hover': {
                bgcolor: '#e0002e', transform: 'translateY(-3px)',
                boxShadow: '0 10px 32px rgba(255,45,85,0.55)',
              },
            }}
          >
            포트폴리오 둘러보기
          </Button>

          {/* Secondary CTA */}
          <Button
            variant="outlined"
            onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
            startIcon={<EmailIcon />}
            sx={{
              borderColor: 'rgba(255,255,255,0.35)', color: 'rgba(255,255,255,0.88)',
              px: { xs: 4, sm: 5 }, py: 1.6, borderRadius: 2, fontWeight: 700,
              textTransform: 'none', fontSize: '1rem',
              transition: 'all 0.22s ease',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.08)',
                borderColor: 'rgba(255,255,255,0.75)',
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 24px rgba(255,255,255,0.1)',
              },
            }}
          >
            연락하기
          </Button>
        </Box>

        {/* ── 소셜 링크 ── */}
        <Box sx={{
          display: 'flex', justifyContent: 'center', gap: 1.5, mt: 4,
          ...fadeUp(1.0),
        }}>
          {[
            { icon: <GitHubIcon />,    label: 'GitHub',    href: 'https://github.com/thornapple1220-byte' },
            { icon: <InstagramIcon />, label: 'Instagram', href: '#' },
            { icon: <LinkedInIcon />,  label: 'LinkedIn',  href: '#' },
          ].map(({ icon, label, href }) => (
            <Tooltip key={label} title={label} arrow>
              <IconButton
                component="a" href={href} target="_blank" rel="noopener noreferrer"
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 2, p: 1.2,
                  transition: 'all 0.22s ease',
                  '&:hover': {
                    color: '#FF2D55',
                    borderColor: '#FF2D55',
                    bgcolor: 'rgba(255,45,85,0.1)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 20px rgba(255,45,85,0.25)',
                  },
                }}
              >
                {icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>

        {/* ── 스크롤 유도 화살표 ── */}
        <Box sx={{
          mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5,
          opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 1.3s',
          cursor: 'pointer',
          '&:hover .arrow-icon': { transform: 'translateY(4px)' },
        }}
          onClick={() => document.getElementById('contact-section')
            ?.closest('main, #root, body')
            ?.querySelector('[id]:not([id="contact-section"])')
            ?.scrollIntoView({ behavior: 'smooth' }) ||
            window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })
          }
        >
          <Typography sx={{
            fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)',
            letterSpacing: '3px', textTransform: 'uppercase',
          }}>
            Scroll
          </Typography>
          <KeyboardArrowDownIcon
            className="arrow-icon"
            sx={{
              color: 'rgba(255,255,255,0.4)', fontSize: '1.8rem',
              transition: 'transform 0.3s ease',
              animation: 'bounce 2s ease-in-out infinite',
              '@keyframes bounce': {
                '0%,100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(6px)' },
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}

/* ── About Me 섹션 ─────────────────────────────────── */
function AboutSection({ photo }) {
  const { basicInfo, sections } = aboutMeData;
  const iAmSection = sections.find((s) => s.showInHome && s.id === 'i-am');

  return (
    <Box sx={{ ...sectionBase, bgcolor: 'var(--color-bg-primary)' }}>
      <Container maxWidth="md">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 6, md: 8 }}
          alignItems="center"
        >
          {/* 왼쪽: 프로필 사진 */}
          <Avatar
            src={photo}
            sx={{
              width: { xs: 200, md: 260 },
              height: { xs: 200, md: 260 },
              bgcolor: 'var(--color-accent)',
              border: '5px solid var(--color-border)',
              boxShadow: '0 16px 48px rgba(255,45,85,0.18)',
              flexShrink: 0,
              alignSelf: { xs: 'center', md: 'auto' },
            }}
          >
            <PersonIcon sx={{ fontSize: { xs: '5rem', md: '7rem' }, color: 'var(--color-primary)' }} />
          </Avatar>

          {/* 오른쪽: 텍스트 */}
          <Box sx={{ flex: 1 }}>
            <SectionLabel text="About Me" />
            {/* 이름 + 카드 */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h2" sx={{ mb: 0.5, color: 'var(--color-text-primary)', fontWeight: 800 }}>
                {basicInfo.name}
              </Typography>
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
    <Box sx={{ ...sectionBase, bgcolor: 'var(--color-bg-soft)' }}>
      <Container maxWidth="md">
        <SectionLabel text="Skill Tree" />
        <Typography variant="h2" sx={{ mb: 1, color: 'var(--color-text-primary)', fontWeight: 800 }}>
          주요 스킬
        </Typography>
        <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)', mb: 6 }}>
          카테고리 순으로 정렬됩니다.
        </Typography>

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
      </Container>
    </Box>
  );
});

/* ── Projects 미리보기 카드 ────────────────────────── */
const THUM_BASE = 'https://image.thum.io/get/width/600/crop/800';

function HomeProjectCard({ project }) {
  const thumbnailSrc = project.thumbnail_url
    || (project.detail_url ? `${THUM_BASE}/${project.detail_url}` : null);

  return (
    <Card
      sx={{
        height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
        borderRadius: 3, overflow: 'hidden',
        bgcolor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        transition: 'transform 0.25s, box-shadow 0.25s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(0,0,0,0.3)' },
      }}
    >
      {/* 썸네일 (16:10 비율) */}
      <Box sx={{ position: 'relative', width: '100%', paddingTop: '62.5%', overflow: 'hidden' }}>
        {thumbnailSrc ? (
          <Box
            component="img"
            src={thumbnailSrc}
            alt={project.title}
            loading="lazy"
            sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
        ) : (
          <Box sx={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-mid) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', textAlign: 'center', px: 2 }}>
              {project.title}
            </Typography>
          </Box>
        )}
      </Box>

      <CardContent sx={{ p: { xs: 1.2, sm: 2 } }}>
        <Typography sx={{ fontWeight: 700, color: 'var(--color-text-white)', mb: 0.8, fontSize: { xs: '0.8rem', sm: '0.95rem' }, lineHeight: 1.4 }}>
          {project.title}
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          {project.tech_stack?.slice(0, 2).map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{ bgcolor: 'rgba(255,45,85,0.15)', color: 'var(--color-accent)', fontSize: { xs: '0.55rem', sm: '0.6rem' }, height: 16, fontWeight: 600 }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

/* ── Projects 섹션 ─────────────────────────────────── */
function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .eq('is_published', true)
          .order('sort_order', { ascending: true })
          .limit(3);
        setProjects(data || []);
      } catch (e) {
        console.error('[Projects] fetch error:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <Box sx={{ ...sectionBase, bgcolor: 'var(--color-bg-navy-mid)' }}>
      <Container maxWidth="md">
        <SectionLabel text="Projects" />
        <Typography variant="h2" sx={{ mb: 1, color: 'var(--color-text-white)', fontWeight: 800 }}>
          프로젝트
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.65)', mb: 6 }}>
          대표 작업물을 소개합니다.
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress sx={{ color: 'var(--color-primary)' }} />
          </Box>
        ) : projects.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem' }}>
              등록된 프로젝트가 없습니다.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ overflow: 'hidden', mb: 6 }}>
            <Grid container spacing={{ xs: 1.5, sm: 3 }}>
              {projects.map((project) => (
                <Grid size={{ xs: 6, sm: 6, md: 4 }} key={project.id} sx={{ display: 'flex' }}>
                  <HomeProjectCard project={project} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        <Button
          component={Link}
          to="/projects"
          variant="outlined"
          sx={{
            color: 'var(--color-text-white)',
            borderColor: 'rgba(255,255,255,0.6)',
            px: 4, py: 1.2, borderRadius: 2, fontWeight: 700, textTransform: 'none',
            boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.15)', borderColor: 'var(--color-text-white)', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' },
          }}
        >
          더 알아보기
        </Button>
      </Container>
    </Box>
  );
}

/* ── Contact 섹션 ──────────────────────────────────── */
function ContactSection() {
  const [entries, setEntries] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(true);

  const fetchEntries = useCallback(async () => {
    setLoadingEntries(true);
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });
      if (error) console.error('[Guestbook] fetch error:', error);
      setEntries(data || []);
    } catch (e) {
      console.error('[Guestbook] unexpected error:', e);
    } finally {
      setLoadingEntries(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <Box id="contact-section" sx={{ ...sectionBase, bgcolor: 'var(--color-bg-soft)' }}>
      <Container maxWidth="md">
        {/* 섹션 타이틀 */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <SectionLabel text="Contact" />
          <Typography variant="h2" sx={{ color: 'var(--color-text-primary)', mb: 1.5 }}>
            연락하기
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)' }}>
            편하게 연락주세요. 방명록도 남겨주시면 감사합니다 😊
          </Typography>
        </Box>

        {/* 연락처 카드 */}
        <Box sx={{ mb: 8 }}>
          <ContactInfoCard />
        </Box>

        <Divider sx={{ borderColor: 'var(--color-border)', mb: 8 }} />

        {/* 방명록 입력 폼 */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" sx={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>
              방명록
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mt: 0.5 }}>
              방문 기념으로 한마디 남겨주세요!
            </Typography>
          </Box>
          <GuestbookForm onSubmitSuccess={fetchEntries} />
        </Box>

        {/* 방명록 목록 */}
        {loadingEntries ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress sx={{ color: 'var(--color-primary)' }} />
          </Box>
        ) : entries.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)' }}>
              아직 방명록이 없어요. 첫 번째로 남겨주세요! 🎉
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {entries.map((entry) => (
              <Grid item xs={12} sm={6} key={entry.id}>
                <GuestbookCard entry={entry} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

function HomePage({ photo, skills }) {
  return (
    <Box>
      <HeroSection />
      <Divider sx={{ borderColor: 'var(--color-border)' }} />
      <AboutSection photo={photo} />
      <Divider sx={{ borderColor: 'var(--color-border)' }} />
      <SkillSection skills={skills} />
      <Divider sx={{ borderColor: 'var(--color-border)' }} />
      <ProjectsSection />
      <Divider sx={{ borderColor: 'var(--color-border)' }} />
      <ContactSection />
    </Box>
  );
}

export default HomePage;
