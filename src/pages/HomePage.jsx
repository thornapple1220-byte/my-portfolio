import { memo, useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Divider, Grid, CircularProgress, Stack, Avatar } from '@mui/material';
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

/* ── Hero 섹션 ─────────────────────────────────────── */
function HeroSection() {
  return (
    <Box
      sx={{
        ...sectionBase,
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-secondary-mid) 100%)',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <SectionLabel text="Hero" />
        <Typography variant="h1" sx={{ mb: 3, color: 'var(--color-text-white)' }}>
          여기는 Hero 섹션입니다.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 520, mx: 'auto' }}
        >
          메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>
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
            }}
          >
            <PersonIcon sx={{ fontSize: { xs: '5rem', md: '7rem' }, color: 'var(--color-primary)' }} />
          </Avatar>

          {/* 오른쪽: 텍스트 */}
          <Box sx={{ flex: 1 }}>
            <SectionLabel text="About Me" />
            {/* 이름 + 카드 가로 배치 */}
            <Stack direction="row" spacing={3} alignItems="flex-start" sx={{ mb: 4 }}>
              <Box sx={{ flexShrink: 0 }}>
                <Typography variant="h2" sx={{ mb: 0.5, color: 'var(--color-text-primary)', fontWeight: 800 }}>
                  {basicInfo.name}
                </Typography>
                <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                  Web Designer
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center" sx={{ mt: 0.5 }}>
                {[
                  { icon: <SchoolIcon fontSize="small" />, label: '학력', value: basicInfo.education },
                  { icon: <PaletteIcon fontSize="small" />, label: '전공', value: basicInfo.major },
                  { icon: <WorkIcon fontSize="small" />,   label: '경력', value: basicInfo.experience },
                ].map(({ icon, label, value }) => (
                  <Box
                    key={label}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1,
                      bgcolor: 'var(--color-bg-soft)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 2, px: 2.5, py: 0.8,
                    }}
                  >
                    <Box sx={{ color: 'var(--color-primary)', display: 'flex', flexShrink: 0 }}>{icon}</Box>
                    <Box>
                      <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--color-text-secondary)', letterSpacing: '0.5px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                        {label}
                      </Typography>
                      <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
                        {value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Stack>

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

/* ── Projects 섹션 ─────────────────────────────────── */
function ProjectsSection() {
  return (
    <Box sx={{ ...sectionBase, bgcolor: 'var(--color-bg-navy-mid)' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <SectionLabel text="Projects" />
        <Typography variant="h2" sx={{ mb: 3, color: 'var(--color-text-white)' }}>
          여기는 Projects 섹션입니다.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'rgba(255,255,255,0.75)', maxWidth: 520, mx: 'auto', mb: 4 }}
        >
          대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.
        </Typography>
        <Button
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
    <Box sx={{ ...sectionBase, bgcolor: 'var(--color-bg-soft)' }}>
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
