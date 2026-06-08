import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, IconButton, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const navItems = [
  { label: 'Home',     path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
        px: { xs: 3, md: 6 },
        bgcolor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {/* 로고 */}
      <Typography
        component={Link}
        to="/"
        sx={{
          fontSize: '1.2rem',
          fontWeight: 700,
          color: 'var(--color-primary)',
          textDecoration: 'none',
          letterSpacing: '-0.5px',
        }}
      >
        Portfolio.
      </Typography>

      {/* 데스크탑 메뉴 */}
      <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
        {navItems.map(({ label, path }) => {
          const isActive = pathname === path;
          return (
            <Box
              key={path}
              component={Link}
              to={path}
              sx={{
                px: 2,
                py: 1,
                fontSize: '0.95rem',
                fontWeight: isActive ? 700 : 400,
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                textDecoration: 'none',
                borderBottom: isActive
                  ? '2px solid var(--color-primary)'
                  : '2px solid transparent',
                transition: 'all 0.2s',
                '&:hover': { color: 'var(--color-primary)' },
              }}
            >
              {label}
            </Box>
          );
        })}
      </Box>

      {/* 모바일 햄버거 */}
      <IconButton
        sx={{ display: { xs: 'flex', md: 'none' }, color: 'var(--color-primary)' }}
        onClick={() => setMobileOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      {/* 모바일 드로어 */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 220, pt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, pb: 1 }}>
            <IconButton
              onClick={() => setMobileOpen(false)}
              sx={{ color: 'var(--color-primary)' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navItems.map(({ label, path }) => (
              <ListItemButton
                key={path}
                component={Link}
                to={path}
                selected={pathname === path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  '&.Mui-selected': {
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                    bgcolor: 'var(--color-bg-soft)',
                  },
                }}
              >
                <ListItemText primary={label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Header;
