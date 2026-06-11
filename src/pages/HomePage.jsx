import { useState, useEffect, useCallback } from 'react';
import { Box, Container, Typography, Button, Divider, Grid, CircularProgress } from '@mui/material';
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
  return (
    <Box sx={{ ...sectionBase, bgcolor: 'var(--color-bg-primary)' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <SectionLabel text="About Me" />
        <Typography variant="h2" sx={{ mb: 3, color: 'var(--color-text-primary)' }}>
          여기는 About Me 섹션입니다.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'var(--color-text-secondary)', maxWidth: 520, mx: 'auto', mb: 4 }}
        >
          간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: 'var(--color-button-primary)',
            '&:hover': { bgcolor: 'var(--color-button-hover)' },
            px: 4,
            py: 1.2,
            borderRadius: 2,
            fontWeight: 700,
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
  return (
    <Box sx={{ ...sectionBase, bgcolor: 'var(--color-bg-soft)' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <SectionLabel text="Skill Tree" />
        <Typography variant="h2" sx={{ mb: 3, color: 'var(--color-text-primary)' }}>
          여기는 Skill Tree 섹션입니다.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'var(--color-text-secondary)', maxWidth: 520, mx: 'auto' }}
        >
          기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
        </Typography>
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
