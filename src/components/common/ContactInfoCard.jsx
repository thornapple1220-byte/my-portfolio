import { Box, Card, CardContent, Typography, IconButton, Tooltip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';

const SNS_LINKS = [
  {
    label: 'Instagram',
    icon: <InstagramIcon />,
    href: 'https://instagram.com/',
    color: '#E1306C',
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
        {/* 이메일 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
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
          <Box>
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
                '&:hover': { color: 'var(--color-primary)' },
              }}
            >
              jje918@naver.com
            </Typography>
          </Box>
        </Box>

        {/* 구분선 */}
        <Box sx={{ borderTop: '1px solid var(--color-border)', mb: 3 }} />

        {/* SNS 아이콘 */}
        <Box>
          <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', mb: 1.5 }}>
            SNS
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {SNS_LINKS.map(({ label, icon, href, color }) => (
              <Tooltip key={label} title={label} arrow>
                <IconButton
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    width: 44,
                    height: 44,
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
      </CardContent>
    </Card>
  );
}

export default ContactInfoCard;
