import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [ma_nhan_vien, setMaNhanVien] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAuth, auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backendchamcong-production.up.railway.app/api/auth/login', {
        ma_nhan_vien,
        password
      });

      localStorage.setItem('auth', JSON.stringify(response.data));
      setAuth(response.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center">
            Đăng nhập
          </Typography>
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Mã nhân viên"
              value={ma_nhan_vien}
              onChange={(e) => setMaNhanVien(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Mật khẩu"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
            
            {/* ====================== */}
            {/* PHẦN ĐÃ ĐƯỢC CẬP NHẬT */}
            {/* ====================== */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              {/* Chỉ admin mới thấy link Quên mật khẩu (vì chỉ admin được reset) */}
              {auth?.employee?.is_admin && (
                <Button 
                  onClick={() => navigate('/forgot-password')} 
                  sx={{ textTransform: 'none', fontSize: '0.875rem' }}
                >
                  Quên mật khẩu?
                </Button>
              )}
              {/* Chỉ admin mới thấy link Đăng ký */}
              {auth?.employee?.is_admin && (
                <Typography variant="body2">
                  Chưa có tài khoản? <Button onClick={() => navigate('/register')} sx={{ textTransform: 'none' }}>Đăng ký</Button>
                </Typography>
              )}
            </Box>
            {/* ====================== */}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;