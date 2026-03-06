import React, { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const ForgotPassword = () => {
  const [ma_nhan_vien, setMaNhanVien] = useState('');
  const [default_password, setDefaultPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (new_password !== confirm_password) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }

    // Kiểm tra độ dài mật khẩu mới
    if (new_password.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    try {
      await axios.post('https://backendchamcong-production.up.railway.app/api/auth/forgot-password', {
        ma_nhan_vien,
        default_password,
        new_password
      });
      setSuccess('Đổi mật khẩu thành công! Đang chuyển đến trang đăng nhập...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Đổi mật khẩu thất bại');
    }
  };

  if (auth) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center">
            Quên mật khẩu
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1, mb: 2, color: 'text.secondary' }}>
            Nhập mật khẩu mặc định để đổi mật khẩu mới
          </Typography>
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" align="center" sx={{ mt: 2 }}>
              {success}
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
              label="Mật khẩu mặc định"
              type="password"
              value={default_password}
              onChange={(e) => setDefaultPassword(e.target.value)}
              helperText="Mật khẩu mặc định: 123@123a"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Mật khẩu mới"
              type="password"
              value={new_password}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Xác nhận mật khẩu mới"
              type="password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đổi mật khẩu
            </Button>
            <Typography align="center">
              <Button onClick={() => navigate('/login')}>Quay lại đăng nhập</Button>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
