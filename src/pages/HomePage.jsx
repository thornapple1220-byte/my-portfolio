import { useState, useEffect, useCallback } from 'react';
import { Box, Container, Typography, Button, Divider, Grid, CircularProgress, Stack } from '@mui/material';
import { aboutMeData, skillsData, categoryColors } from '../data/aboutMeData';
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
function AboutSection() {
  const { basicInfo, sections } = aboutMeData;
  const iAmSection = sections.find((s) => s.showInHome && s.id === 'i-am');

  return (
    <Box sx={{ ...sectionBase, bgcolor: 'var(--color-bg-primary)' }}>
      <Container maxWidth="md">
        <SectionLabel text="About Me" />
        <Typography variant="h2" sx={{ mb: 0.5, color: 'var(--color-text-primary)', fontWeight: 800 }}>
          {basicInfo.name}
        </Typography>
        <Typography
          sx={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)', mb: 5 }}
        >
          Web Designer · {basicInfo.experience}
        </Typography>

        {iAmSection && (
          <Stack spacing={2.5} sx={{ mb: 6 }}>
            {iAmSection.content.map((phrase, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: idx === iAmSection.content.length - 1
                      ? 'var(--color-primary)'
                      : 'var(--color-accent)',
                    flexShrink: 0,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: '1.1rem', md: '1.4rem' },
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {phrase}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}

        <Button
          variant="contained"
          href="/my-portfolio/about"
          sx={{
            bgcolor: 'var(--color-button-primary)',
            '&:hover': { bgcolor: 'var(--color-button-hover)' },
            px: 4,
            py: 1.2,
            borderRadius: 2,
            fontWeight: 700,
            textTransform: 'none',
          }}
        >
          더 알아보기
        </Button>
      </Container>
    </Box>
  );
}

/* ── Skill Tree 섹션 ───────────────────────────────── */
function SkillSection() {
  const [animated, setAnimated] = useState(false);
  const homeSkills = skillsData
    .filter((s) => s.showInHome)
    .sort((a, b) => b.level - a.level);

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
          숙련도 높은 순으로 정렬됩니다.
        </Typography>

        <Stack spacing={2.5}>
          {homeSkills.map((skill, idx) => {
            const color = categoryColors[skill.category] ?? '#999';
            return (
              <Box key={skill.id}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.8 }}>
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <Box
                      sx={{
                        width: 8, height: 8, borderRadius: '50%',
                        bgcolor: color, flexShrink: 0,
                      }}
                    />
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>
                      {skill.name}
                    </Typography>
                    <Box
                      sx={{
                        fontSize: '0.65rem', fontWeight: 700, px: 0.8, py: 0.2,
                        borderRadius: 1, bgcolor: `${color}18`, color,
                      }}
                    >
                      {skill.category}
                    </Box>
                  </Stack>
                  <Typography sx={{ fontSize: '0.9rem', fontWeight: 800, color }}>
                    {skill.level}%
                  </Typography>
                </Stack>
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
      </Container>
    </Box>
  );
}

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
            px: 4,
            py: 1.2,
            borderRadius: 2,
            fontWeight: 700,
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.15)',
              borderColor: 'var(--color-text-white)',
            },
          }}
        >
          더 보기
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

function HomePage() {
  return (
    <Box>
      <HeroSection />
      <Divider sx={{ borderColor: 'var(--color-border)' }} />
      <AboutSection />
      <Divider sx={{ borderColor: 'var(--color-border)' }} />
      <SkillSection />
      <Divider sx={{ borderColor: 'var(--color-border)' }} />
      <ProjectsSection />
      <Divider sx={{ borderColor: 'var(--color-border)' }} />
      <ContactSection />
    </Box>
  );
}

export default HomePage;
