import { Box, Container, Typography, Button, Divider } from '@mui/material';

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
        color: 'var(--color-primary-dark)',
        bgcolor: 'var(--color-primary-light)',
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

/* ── Hero 섹션 ─────────────────────────────────────────── */
function HeroSection() {
  return (
    <Box
      sx={{
        ...sectionBase,
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-primary-light) 100%)',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <SectionLabel text="Hero" />
        <Typography variant="h1" sx={{ mb: 3, color: 'var(--color-text-primary)' }}>
          여기는 Hero 섹션입니다.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'var(--color-text-secondary)', maxWidth: 520, mx: 'auto', mb: 1 }}
        >
          메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

/* ── About Me 섹션 ──────────────────────────────────────── */
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
          }}
        >
          더 알아보기
        </Button>
      </Container>
    </Box>
  );
}

/* ── Skill Tree 섹션 ────────────────────────────────────── */
function SkillSection() {
  return (
    <Box sx={{ ...sectionBase, bgcolor: 'var(--color-bg-secondary)' }}>
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

/* ── Projects 섹션 ──────────────────────────────────────── */
function ProjectsSection() {
  return (
    <Box sx={{ ...sectionBase, bgcolor: 'var(--color-bg-dark)' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <SectionLabel text="Projects" />
        <Typography variant="h2" sx={{ mb: 3, color: 'var(--color-text-white)' }}>
          여기는 Projects 섹션입니다.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'var(--color-text-muted)', maxWidth: 520, mx: 'auto', mb: 4 }}
        >
          대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.
        </Typography>
        <Button
          variant="outlined"
          sx={{
            color: 'var(--color-text-white)',
            borderColor: 'var(--color-text-white)',
            px: 4,
            py: 1.2,
            borderRadius: 2,
            '&:hover': {
              bgcolor: 'var(--color-text-white)',
              color: 'var(--color-text-primary)',
            },
          }}
        >
          더 보기
        </Button>
      </Container>
    </Box>
  );
}

/* ── Contact 섹션 ───────────────────────────────────────── */
function ContactSection() {
  return (
    <Box sx={{ ...sectionBase, bgcolor: 'var(--color-secondary)' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <SectionLabel text="Contact" />
        <Typography variant="h2" sx={{ mb: 3, color: 'var(--color-text-primary)' }}>
          여기는 Contact 섹션입니다.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'var(--color-text-primary)', opacity: 0.7, maxWidth: 520, mx: 'auto' }}
        >
          연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

/* ── 메인 ───────────────────────────────────────────────── */
function HomePage() {
  return (
    <Box>
      <HeroSection />
      <Divider />
      <AboutSection />
      <Divider />
      <SkillSection />
      <Divider />
      <ProjectsSection />
      <Divider />
      <ContactSection />
    </Box>
  );
}

export default HomePage;
