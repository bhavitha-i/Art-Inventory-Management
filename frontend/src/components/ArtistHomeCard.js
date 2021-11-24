import { Icon } from '@iconify/react';
import userFavorite from '@iconify/icons-carbon/user-favorite';
import  { useEffect, useState } from "react"
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import PeopleOutlineSharpIcon from '@mui/icons-material/PeopleOutlineSharp';
import { useNavigate } from 'react-router-dom';


// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter,
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------


export default function ArtistHomeCard(props) {

  const navigate = useNavigate();

  function handleClick(){
    navigate("/artist")
  }

  return (
    <RootStyle onClick={() => handleClick()}  >
      <IconWrapperStyle>
      <Icon icon={userFavorite} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h4">Artist</Typography>
      {/* <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Some desc
      </Typography> */}
    </RootStyle>
  );
}
