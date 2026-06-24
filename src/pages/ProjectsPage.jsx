import { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Card, CardContent,
  Chip, Stack, CircularProgress, Alert,
} from '@mui/material';
import supabase from '../utils/supabase';

const THUM_BASE = 'https://image.thum.io/get/width/600/crop/800';

const TAG_COLORS = {
  'React':             '#26C6A6',
  'CSS3':              '#26C6A6',
  'HTML/CSS':          '#26C6A6',
  'Supabase':          '#FF5F7E',
  'MUI':               '#FF5F7E',
  'PostgreSQL':        '#FF9F0A',
  'Unsplash API':      '#FF9F0A',
  'Photoshop':         '#7B68EE',
  '상세페이지 디자인': '#7B68EE',
};

function getTagStyle(tag) {
  const color = TAG_COLORS[tag];
  if (!color) return { bgcolor: 'var(--color-accent)', color: 'var(--color-primary)' };
  return { bgcolor: `${color}20`, color, border: `1px solid ${color}55` };
}

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

function ThumbnailImage({ src, alt, scrollable = false }) {
  const [imgError, setImgError] = useState(false);

  if (scrollable && src && !imgError) {
    return (
      <Box sx={{
        position: 'relative', width: '100%', height: 280,
        flexShrink: 0, overflow: 'hidden',
        '&:hover img': {
          transform: 'translateY(calc(-100% + 280px))',
          transition: 'transform 10s ease-in-out',
        },
      }}>
        <Box
          component="img"
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          sx={{ width: '100%', height: 'auto', display: 'block', transform: 'translateY(0)', transition: 'transform 0.3s ease' }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', width: '100%', paddingTop: '133.33%', flexShrink: 0, overflow: 'hidden' }}>
      {src && !imgError ? (
        <Box
          component="img"
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          sx={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top', display: 'block',
          }}
        />
      ) : (
        <Box
          sx={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, var(--color-accent) 0%, #E4DFFF 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'var(--color-primary)', fontWeight: 600, textAlign: 'center' }}>
            {alt}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

function ProjectCard({ project }) {
  const thumbnailSrc = getThumbnailUrl(project);
  const isDetailPage = project.category === '상세페이지';
  const hasLinks = project.demo_url || project.github_url || project.detail_url || isDetailPage;

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
        border: '1px solid var(--color-border)',
        boxShadow: 'none',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 36px rgba(123,104,238,0.18)',
        },
        '&:hover .hover-overlay': { opacity: 1 },
      }}
    >
      {/* 썸네일 + 호버 오버레이 */}
      <Box sx={{ position: 'relative' }}>
        <ThumbnailImage src={thumbnailSrc} alt={project.title} />

        {hasLinks && (
          <Box
            className="hover-overlay"
            sx={{
              position: 'absolute', inset: 0,
              bgcolor: 'rgba(91,79,207,0.75)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 1.5,
              opacity: 0,
              transition: 'opacity 0.25s ease',
            }}
          >
            {isDetailPage && thumbnailSrc && (
              <Box
                component="a"
                href={thumbnailSrc}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: '0.75rem', fontWeight: 700, color: '#fff',
                  border: '1px solid rgba(255,255,255,0.8)',
                  borderRadius: 1.5, px: 1.8, py: 0.6, letterSpacing: '0.5px',
                  textDecoration: 'none',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
                }}
              >
                전체 보기 →
              </Box>
            )}
            {!isDetailPage && project.demo_url && (
              <Box
                component="a"
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: '0.75rem', fontWeight: 700, color: '#fff',
                  border: '1px solid rgba(255,255,255,0.8)',
                  borderRadius: 1.5, px: 1.8, py: 0.6, letterSpacing: '0.5px',
                  textDecoration: 'none',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
                }}
              >
                바로가기 →
              </Box>
            )}
            {project.github_url && (
              <Box
                component="a"
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: '0.75rem', fontWeight: 700, color: '#fff',
                  border: '1px solid rgba(255,255,255,0.8)',
                  borderRadius: 1.5, px: 1.8, py: 0.6, letterSpacing: '0.5px',
                  textDecoration: 'none',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
                }}
              >
                GitHub →
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* 카드 내용 */}
      <CardContent sx={{ p: 2, pb: '16px !important', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Stack direction="row" spacing={0.8} alignItems="flex-start">
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.3, flex: 1 }}
          >
            {project.title}
          </Typography>
          <Box
            sx={{
              flexShrink: 0,
              fontSize: '0.6rem',
              fontWeight: 700,
              color: 'var(--color-primary)',
              bgcolor: 'var(--color-accent)',
              border: '1px solid var(--color-primary)',
              borderRadius: 1,
              px: 0.7,
              py: 0.2,
              lineHeight: 1.4,
              whiteSpace: 'nowrap',
              mt: 0.1,
            }}
          >
            {project.category === '바이브코딩' ? '기여도 70% · AI 협업' : '기여도 100%'}
          </Box>
        </Stack>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 0.5 }}>
          {project.tech_stack?.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                ...getTagStyle(tech),
                fontWeight: 600,
                fontSize: '0.65rem',
                height: 20,
                mb: 0.5,
              }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

const CATEGORIES = ['전체', '상세페이지', 'UI디자인', '바이브코딩'];

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('전체');

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

  const CATEGORY_ORDER = { '상세페이지': 0, 'UI디자인': 1, '바이브코딩': 2 };

  const filtered = (activeCategory === '전체'
    ? [...projects].sort((a, b) =>
        (CATEGORY_ORDER[a.category] ?? 99) - (CATEGORY_ORDER[b.category] ?? 99)
      )
    : projects.filter((p) => p.category === activeCategory));

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', py: { xs: 8, md: 12 } }}>
      <Box sx={{ px: { xs: 3, md: 6 } }}>
        {/* 헤더 */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ color: 'var(--color-text-primary)', mb: 2 }}>
            프로젝트
          </Typography>
        </Box>

        {/* 카테고리 필터 */}
        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap sx={{ mb: 8 }}>
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setActiveCategory(cat)}
                sx={{
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  px: 1,
                  height: 36,
                  borderRadius: 2,
                  cursor: 'pointer',
                  bgcolor: active ? '#7B68EE' : '#ffffff',
                  color: active ? '#ffffff' : 'var(--color-text-secondary)',
                  border: active ? 'none' : '1px solid var(--color-border)',
                  boxShadow: active ? '0 4px 12px rgba(123,104,238,0.3)' : 'none',
                  transition: 'all 0.18s ease',
                  '&:hover': {
                    bgcolor: active ? '#5B4FCF' : 'var(--color-accent)',
                    color: active ? '#ffffff' : 'var(--color-primary)',
                  },
                }}
              />
            );
          })}
        </Stack>

        {/* 로딩 */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: 'var(--color-primary)' }} />
          </Box>
        )}

        {/* 에러 */}
        {error && (
          <Alert severity="error" sx={{ maxWidth: 480, mx: 'auto' }}>{error}</Alert>
        )}

        {/* 프로젝트 그리드 */}
        {!loading && !error && (
          <Grid container spacing={3}>
            {filtered.length === 0 ? (
              <Grid size={12}>
                <Box sx={{ textAlign: 'center', py: 10 }}>
                  <Typography variant="body1" sx={{ color: 'var(--color-text-muted)' }}>
                    등록된 프로젝트가 없습니다.
                  </Typography>
                </Box>
              </Grid>
            ) : (
              filtered.map((project) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={project.id}>
                  <ProjectCard project={project} />
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default ProjectsPage;
