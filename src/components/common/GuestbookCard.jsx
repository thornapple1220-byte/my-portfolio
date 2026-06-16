import { Box, Card, CardContent, Typography, Rating, Chip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function GuestbookCard({ entry }) {
  const {
    name, content, organization, email, phone,
    emoji, keyword, rating, email_public, phone_public, created_at,
  } = entry;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1.5px solid var(--color-border)',
        bgcolor: 'var(--color-bg-primary)',
        transition: 'transform 0.15s, box-shadow 0.15s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 20px rgba(123,104,238,0.1)',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        {/* 헤더: 이모지 + 이름 + 날짜 */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: 'var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                flexShrink: 0,
              }}
            >
              {emoji || '😊'}
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
                {name || '익명'}
              </Typography>
              {organization && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.3 }}>
                  <BusinessIcon sx={{ fontSize: 12, color: 'var(--color-text-secondary)' }} />
                  <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)' }}>
                    {organization}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', flexShrink: 0, mt: 0.2 }}>
            {formatDate(created_at)}
          </Typography>
        </Box>

        {/* 별점 */}
        {rating && (
          <Rating
            value={rating}
            readOnly
            size="small"
            sx={{ color: 'var(--color-primary)', mb: 1 }}
          />
        )}

        {/* 내용 */}
        <Typography
          variant="body2"
          sx={{ color: 'var(--color-text-primary)', lineHeight: 1.7, mb: keyword ? 1.5 : 0 }}
        >
          {content}
        </Typography>

        {/* 키워드 칩 */}
        {keyword && (
          <Chip
            label={`# ${keyword}`}
            size="small"
            sx={{
              bgcolor: 'var(--color-accent)',
              color: 'var(--color-primary)',
              fontWeight: 600,
              fontSize: '0.75rem',
              mt: 0.5,
            }}
          />
        )}

        {/* 공개 연락처 */}
        {(email_public && email) || (phone_public && phone) ? (
          <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px solid var(--color-border)', display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {email_public && email && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <EmailIcon sx={{ fontSize: 13, color: 'var(--color-text-secondary)' }} />
                <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)' }}>{email}</Typography>
              </Box>
            )}
            {phone_public && phone && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PhoneIcon sx={{ fontSize: 13, color: 'var(--color-text-secondary)' }} />
                <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)' }}>{phone}</Typography>
              </Box>
            )}
          </Box>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default GuestbookCard;
