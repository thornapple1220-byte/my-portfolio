import { useState } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Button,
  Stack, ToggleButton, ToggleButtonGroup, Rating, FormControlLabel,
  Switch, Collapse, CircularProgress, Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import supabase from '../../utils/supabase';

const EMOJIS = ['😊', '🎉', '✨', '💪', '🚀', '💡', '❤️', '🌟'];

const FIELD_DEFAULTS = {
  name: '',
  content: '',
  organization: '',
  email: '',
  phone: '',
  emoji: '😊',
  keyword: '',
  rating: 0,
  is_public: true,
  email_public: false,
  phone_public: false,
};

function GuestbookForm({ onSubmitSuccess }) {
  const [form, setForm] = useState(FIELD_DEFAULTS);
  const [showOptional, setShowOptional] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleToggle = (field) => (_, value) => {
    if (value !== null) setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSwitch = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.content.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }
    setLoading(true);
    setError('');

    const payload = {
      name:         form.name.trim() || null,
      content:      form.content.trim(),
      organization: form.organization.trim() || null,
      email:        form.email.trim() || null,
      phone:        form.phone.trim() || null,
      emoji:        form.emoji,
      keyword:      form.keyword.trim() || null,
      rating:       form.rating || null,
      is_public:    form.is_public,
      email_public: form.email_public,
      phone_public: form.phone_public,
    };

    const { error: dbError } = await supabase.from('guestbook').insert(payload);

    setLoading(false);
    if (dbError) {
      setError('저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    setSuccess(true);
    setForm(FIELD_DEFAULTS);
    setTimeout(() => setSuccess(false), 4000);
    onSubmitSuccess?.();
  };

  return (
    <Card
      elevation={0}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        borderRadius: 4,
        border: '1.5px solid var(--color-border)',
        bgcolor: 'var(--color-bg-primary)',
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--color-text-primary)', mb: 0.5 }}>
          방명록 남기기
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mb: 3 }}>
          방문해 주셔서 감사합니다 🙏
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
            방명록이 등록되었습니다! 감사합니다 😊
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={2} component="form" onSubmit={handleSubmit}>
          {/* 필수 필드 */}
          <TextField
            label="이름"
            placeholder="비워두면 익명으로 표시됩니다"
            value={form.name}
            onChange={handleChange('name')}
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            label="내용 *"
            placeholder="한마디 남겨주세요!"
            value={form.content}
            onChange={handleChange('content')}
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            required
          />

          {/* 이모지 선택 */}
          <Box>
            <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mb: 1, fontWeight: 600 }}>
              이모지 선택
            </Typography>
            <ToggleButtonGroup
              value={form.emoji}
              exclusive
              onChange={handleToggle('emoji')}
              sx={{ flexWrap: 'wrap', gap: 0.5 }}
            >
              {EMOJIS.map((em) => (
                <ToggleButton
                  key={em}
                  value={em}
                  sx={{
                    fontSize: '1.3rem',
                    px: 1.2,
                    py: 0.5,
                    border: '1.5px solid var(--color-border) !important',
                    borderRadius: '8px !important',
                    '&.Mui-selected': {
                      bgcolor: 'var(--color-accent)',
                      borderColor: 'var(--color-primary) !important',
                    },
                  }}
                >
                  {em}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          {/* 별점 */}
          <Box>
            <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mb: 0.5, fontWeight: 600 }}>
              별점 평가
            </Typography>
            <Rating
              value={form.rating}
              onChange={(_, val) => setForm((prev) => ({ ...prev, rating: val }))}
              sx={{ color: 'var(--color-primary)' }}
            />
          </Box>

          {/* 한마디 키워드 */}
          <TextField
            label="한마디 키워드"
            placeholder="예: 열정적인, 꼼꼼한, 창의적인..."
            value={form.keyword}
            onChange={handleChange('keyword')}
            variant="outlined"
            size="small"
            fullWidth
          />

          {/* 선택 정보 토글 */}
          <Button
            variant="text"
            size="small"
            onClick={() => setShowOptional((v) => !v)}
            sx={{ color: 'var(--color-primary)', alignSelf: 'flex-start', px: 0, fontWeight: 600 }}
          >
            {showOptional ? '▲ 선택 정보 접기' : '▼ 선택 정보 더 입력하기'}
          </Button>

          <Collapse in={showOptional}>
            <Stack spacing={2}>
              <TextField
                label="소속 / 직업"
                placeholder="예: 프론트엔드 개발자, 대학생..."
                value={form.organization}
                onChange={handleChange('organization')}
                variant="outlined"
                size="small"
                fullWidth
              />
              <Box>
                <TextField
                  label="이메일 (선택)"
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.email_public}
                      onChange={handleSwitch('email_public')}
                      size="small"
                      sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'var(--color-primary)' } }}
                    />
                  }
                  label={<Typography variant="caption" sx={{ color: 'var(--color-text-secondary)' }}>이메일 공개</Typography>}
                  sx={{ mt: 0.5, ml: 0 }}
                />
              </Box>
              <Box>
                <TextField
                  label="전화번호 (선택)"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.phone_public}
                      onChange={handleSwitch('phone_public')}
                      size="small"
                      sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'var(--color-primary)' } }}
                    />
                  }
                  label={<Typography variant="caption" sx={{ color: 'var(--color-text-secondary)' }}>전화번호 공개</Typography>}
                  sx={{ mt: 0.5, ml: 0 }}
                />
              </Box>
            </Stack>
          </Collapse>

          {/* 공개/비공개 */}
          <FormControlLabel
            control={
              <Switch
                checked={form.is_public}
                onChange={handleSwitch('is_public')}
                sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'var(--color-primary)' } }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                {form.is_public ? '방명록 공개' : '방명록 비공개'}
              </Typography>
            }
          />

          <Button
            type="submit"
            variant="contained"
            endIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
            disabled={loading}
            sx={{
              bgcolor: 'var(--color-primary)',
              '&:hover': { bgcolor: 'var(--color-primary-dark)' },
              borderRadius: 2,
              py: 1.2,
              fontWeight: 700,
            }}
          >
            {loading ? '등록 중...' : '방명록 등록'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default GuestbookForm;
