import { Box, Card, CardContent, Typography, IconButton, Tooltip, Stack, Divider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import GitHubIcon from '@mui/icons-material/GitHub';

const SNS_LINKS = [
  {
    label: 'GitHub',
    icon: <GitHubIcon />,
    href: 'https://github.com/thornapple1220-byte',
    color: '#333333',
  },
];

function ContactInfoCard() {
  return (
    <Card
      elevation={0}
      sx={{
        maxWidth: 480,
        mx: 'auto',
        borderRadius: 4,
        border: '1.5px solid var(--color-border)',
        bgcolor: 'var(--color-bg-primary)',
        p: { xs: 2, md: 3 },
      }}
    >
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Stack spacing={2.5} divider={<Divider sx={{ borderColor: 'var(--color-border)' }} />}>
          {/* 이메일 + SNS 한 줄 */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            {/* 이메일 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  bgcolor: 'var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <EmailIcon sx={{ color: 'var(--color-primary)', fontSize: 22 }} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Email
                </Typography>
                <Typography
                  component="a"
                  href="mailto:jje918@naver.com"
                  variant="body1"
                  sx={{
                    display: 'block',
                    color: 'var(--color-text-primary)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    '&:hover': { color: 'var(--color-primary)' },
                  }}
                >
                  jje918@naver.com
                </Typography>
              </Box>
            </Box>

            {/* SNS 아이콘 */}
            <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
              {SNS_LINKS.map(({ label, icon, href, color }) => (
                <Tooltip key={label} title={label} arrow>
                  <IconButton
                    component="a"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: 'var(--color-bg-soft)',
                      color: color,
                      border: '1.5px solid var(--color-border)',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: color,
                        color: '#fff',
                        borderColor: color,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    {icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          </Box>

          {/* 전화번호 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                bgcolor: 'var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <LocalPhoneIcon sx={{ color: 'var(--color-primary)', fontSize: 22 }} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                Phone
              </Typography>
              <Typography
                component="a"
                href="tel:010-4754-5394"
                variant="body1"
                sx={{
                  display: 'block',
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  '&:hover': { color: 'var(--color-primary)' },
                }}
              >
                010-4754-5394
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ContactInfoCard;
