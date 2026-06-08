import { Box, Container, Typography } from '@mui/material';

function AboutMePage() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        bgcolor: 'var(--color-bg-primary)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 10 }}>
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
            mb: 3,
          }}
        >
          About Me
        </Typography>
        <Typography variant="h2" sx={{ mb: 3, color: 'var(--color-text-primary)' }}>
          About Me 페이지가 개발될 공간입니다.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'var(--color-text-secondary)', maxWidth: 480, mx: 'auto' }}
        >
          상세한 자기소개가 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default AboutMePage;
