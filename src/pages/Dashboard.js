import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import AdminHistory from './AdminHistory';
import { Box, Typography, Paper, Grid, Tabs, Tab } from '@mui/material';
import ScheduleBoard from '../components/ScheduleBoard';
import Attendance from './Attendance';
import AnalogClock from './AnalogClock';

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const [tab, setTab] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  // Admin → chỉ hiển thị trang quản lý
  if (auth?.employee?.is_admin) {
    return <AdminHistory />;
  }

  return (
    <Box sx={{ p: 1.5 }}>
      {/* ===== TABS ===== */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          mb: 1,
          minHeight: 32,
          '& .MuiTabs-indicator': {
            height: 2,
          },
        }}
      >
        <Tab
          label="Hôm nay"
          sx={{
            minHeight: 32,
            padding: '6px 10px',
            fontSize: 13,
            fontWeight: 500,
            textTransform: 'none',
          }}
        />
        <Tab
          label="Đăng ký trực trước"
          sx={{
            minHeight: 32,
            padding: '6px 10px',
            fontSize: 13,
            fontWeight: 500,
            textTransform: 'none',
          }}
        />
        <Tab
          label="Thông tin cá nhân"
          sx={{
            minHeight: 32,
            padding: '6px 10px',
            fontSize: 13,
            fontWeight: 500,
            textTransform: 'none',
          }}
        />
      </Tabs>

      {/* ===== TAB 0: HÔM NAY (CHECKIN/CHECKOUT NHANH) ===== */}
      {tab === 0 && (
        <Box sx={{ mt: 0.5 }}>
          <Attendance onChanged={() => setRefreshKey((k) => k + 1)} />
        </Box>
      )}

      {/* ===== TAB 1: LỊCH TRỰC THÁNG ===== */}
      {tab === 1 && (
        <Box sx={{ mt: 0.5 }}>
          <ScheduleBoard refreshToken={refreshKey} />
        </Box>
      )}

      {/* ===== TAB 2: THÔNG TIN CÁ NHÂN ===== */}
      {tab === 2 && (
        <Grid container spacing={1.5}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 1.5 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                Thông tin nhân viên
              </Typography>

              <Typography sx={{ fontSize: 13 }}>
                Mã nhân viên: {auth?.employee.ma_nhan_vien}
              </Typography>
              <Typography sx={{ fontSize: 13 }}>
                Tên nhân viên: {auth?.employee.ten_nhan_vien}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 1.5 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                Hướng dẫn sử dụng
              </Typography>

              <Typography sx={{ fontSize: 13 }}>
                - Click ô trống để đăng ký ca
              </Typography>
              <Typography sx={{ fontSize: 13 }}>
                - Chuột phải ô của bạn để check-in / check-out
              </Typography>
              <Typography sx={{ fontSize: 13 }}>
                - Xanh lá: đã đăng ký · Vàng: đang làm · Xanh dương: hoàn thành
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
      <AnalogClock />
    </Box>
  );
};

export default Dashboard;