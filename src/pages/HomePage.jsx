import { memo, useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Divider, Grid, CircularProgress, Stack, Avatar, Card, CardContent, Chip } from '@mui/material';
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
        py: { xs: 14, md: 20 },
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-secondary-mid) 100%)',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Box sx={{ mb: 6 }}>
          <SectionLabel text="Portfolio" />
        </Box>

        {/* 이름 + 역할 */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'baseline' }, justifyContent: 'center', gap: { xs: 1, sm: 5 }, mb: 5 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3.5rem', md: '5.5rem' },
              fontWeight: 900,
              color: 'var(--color-text-white)',
              letterSpacing: '-2px',
              lineHeight: 1,
            }}
          >
            장지은
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.3rem', md: '1.7rem' },
              fontWeight: 700,
              color: 'var(--color-accent)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
            }}
          >
            Web Designer
          </Typography>
        </Box>

        {/* 구분선 */}
        <Box sx={{ width: 48, height: 3, bgcolor: 'var(--color-primary)', mx: 'auto', mb: 6, borderRadius: 2 }} />

        {/* 헤드라인 */}
        <Typography
          sx={{
            fontSize: { xs: '1.15rem', md: '1.45rem' },
            color: 'var(--color-text-white)',
            lineHeight: 2.2,
            maxWidth: 600,
            mx: 'auto',
            mb: 8,
            wordBreak: 'keep-all',
          }}
        >
          회사에서만 6년, 프리랜서로도 꾸준히!<br />
          상세페이지, 배너, 쇼핑몰 관리, 간단한 영상까지{' '}
          <Box component="span" sx={{ color: 'var(--color-accent)', fontWeight: 900, whiteSpace: 'nowrap', fontSize: { xs: '1.7rem', md: '2.3rem' }, letterSpacing: '-0.5px' }}>
            웬만한 건 다 해요.
          </Box>
        </Typography>

        {/* CTA 버튼 */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            component={Link}
            to="/projects"
            variant="contained"
            sx={{
              bgcolor: 'var(--color-button-primary)',
              '&:hover': { bgcolor: 'var(--color-button-hover)' },
              px: 4, py: 1.2, borderRadius: 2, fontWeight: 700, textTransform: 'none',
              boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
            }}
          >
            작업물 보기
          </Button>
          <Button
            href="/my-portfolio/about"
            variant="outlined"
            sx={{
              borderColor: 'rgba(255,255,255,0.6)',
              color: 'var(--color-text-white)',
              px: 4, py: 1.2, borderRadius: 2, fontWeight: 700, textTransform: 'none',
              boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'var(--color-text-white)', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' },
            }}
          >
            더 알아보기
          </Button>
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
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
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
        height: '100%', display: 'flex', flexDirection: 'column',
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
                <Grid item xs={6} sm={6} md={4} key={project.id}>
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
