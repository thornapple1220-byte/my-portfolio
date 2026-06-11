import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardMedia, CardContent,
  CardActions, Button, Chip, Stack, CircularProgress, Alert,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArticleIcon from '@mui/icons-material/Article';
import supabase from '../utils/supabase';

const THUM_BASE = 'https://image.thum.io/get/width/600/crop/338';

function getThumbnailUrl(project) {
  if (project.thumbnail_url) return project.thumbnail_url;
  if (project.detail_url) return `${THUM_BASE}/${project.detail_url}`;
  return null;
}

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

function ThumbnailImage({ src, alt }) {
  const [imgError, setImgError] = useState(false);

  return (
    /* 16:9 비율 고정 (56.25% = 9/16) */
    <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%', flexShrink: 0, overflow: 'hidden' }}>
      {src && !imgError ? (
        <Box
          component="img"
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          sx={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
          }}
        />
      ) : (
        <Box
          sx={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-mid) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600, textAlign: 'center' }}>
            {alt}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

function ProjectCard({ project }) {
  const thumbnailSrc = getThumbnailUrl(project);

  const formattedDate = new Date(project.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
        },
      }}
    >
      {/* 썸네일: detail_url 기반 thum.io 실시간 생성 */}
      <ThumbnailImage src={thumbnailSrc} alt={project.title} />

      {/* 카드 내용 */}
      <CardContent sx={{ flex: 1, p: 1.5, pb: '0 !important', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography variant="caption" sx={{ color: 'var(--color-text-muted)' }}>
          {formattedDate}
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.3 }}
        >
          {project.title}
        </Typography>

        {/* 기술 스택 뱃지 */}
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 0.5 }}>
          {project.tech_stack?.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                bgcolor: 'var(--color-accent)',
                color: 'var(--color-primary)',
                fontWeight: 600,
                fontSize: '0.65rem',
                height: 20,
                mb: 0.5,
              }}
            />
          ))}
        </Stack>
      </CardContent>

      {/* 버튼 */}
      <CardActions sx={{ p: 1.5, pt: 0.5, flexWrap: 'wrap', gap: 0.5, flexShrink: 0 }}>
        {project.demo_url && (
          <Button
            size="small"
            variant="contained"
            startIcon={<OpenInNewIcon fontSize="small" />}
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              bgcolor: 'var(--color-button-primary)',
              '&:hover': { bgcolor: 'var(--color-button-hover)' },
              fontSize: '0.72rem',
              fontWeight: 600,
              px: 1.5,
            }}
          >
            Live Demo
          </Button>
        )}
        {project.github_url && (
          <Button
            size="small"
            variant="outlined"
            startIcon={<GitHubIcon fontSize="small" />}
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)',
              '&:hover': { bgcolor: 'var(--color-accent)', borderColor: 'var(--color-primary)' },
              fontSize: '0.72rem',
              fontWeight: 600,
              px: 1.5,
            }}
          >
            GitHub
          </Button>
        )}
        {project.detail_url && (
          <Button
            size="small"
            variant="text"
            startIcon={<ArticleIcon fontSize="small" />}
            href={project.detail_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'var(--color-text-secondary)',
              '&:hover': { color: 'var(--color-primary)' },
              fontSize: '0.72rem',
              fontWeight: 600,
              ml: 'auto',
            }}
          >
            View Details
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('is_published', true)
          .order('sort_order', { ascending: true });
        if (error) throw error;
        setProjects(data || []);
      } catch (e) {
        setError('프로젝트를 불러오는 데 실패했습니다.');
        console.error('[Projects] fetch error:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        bgcolor: 'var(--color-bg-navy-light)',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="xl">
        {/* 헤더 */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <SectionLabel text="Projects" />
          <Typography variant="h2" sx={{ color: 'var(--color-text-primary)', mb: 2 }}>
            프로젝트
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'var(--color-text-secondary)', maxWidth: 480, mx: 'auto' }}
          >
            직접 기획하고 개발한 프로젝트들을 소개합니다.
          </Typography>
        </Box>

        {/* 로딩 */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: 'var(--color-primary)' }} />
          </Box>
        )}

        {/* 에러 */}
        {error && (
          <Alert severity="error" sx={{ maxWidth: 480, mx: 'auto' }}>
            {error}
          </Alert>
        )}

        {/* 프로젝트 그리드 */}
        {!loading && !error && (
          <Grid container spacing={3}>
            {projects.length === 0 ? (
              <Grid size={12}>
                <Box sx={{ textAlign: 'center', py: 10 }}>
                  <Typography variant="body1" sx={{ color: 'var(--color-text-muted)' }}>
                    등록된 프로젝트가 없습니다.
                  </Typography>
                </Box>
              </Grid>
            ) : (
              projects.map((project) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={project.id}>
                  <ProjectCard project={project} />
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default ProjectsPage;
