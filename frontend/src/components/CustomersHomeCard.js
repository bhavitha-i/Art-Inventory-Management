import { Icon } from '@iconify/react';
import androidFilled from '@iconify/icons-ant-design/android-filled';
import  { useEffect, useState } from "react"
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PeopleOutlineSharpIcon from '@mui/icons-material/PeopleOutlineSharp';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.secondary.darker,
  backgroundColor: theme.palette.secondary.lighter,
  borderRadius: '16px',
  cursor: "pointer"

}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '70%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.secondary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.secondary.dark, 0)} 0%, ${alpha(
    theme.palette.secondary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function CusotmersHomeCard(props) {

  const navigate = useNavigate();

  function handleClick(){
    navigate("/customer")
  }


  return (
    <RootStyle onClick={() => handleClick()}>
      <IconWrapperStyle>
        <PeopleOutlineSharpIcon width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h4">Customers</Typography>
      {/* <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Some desc
      </Typography> */}
    </RootStyle>
  );
}
