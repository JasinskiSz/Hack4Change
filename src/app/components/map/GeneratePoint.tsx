'use client';
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { PointerIcon } from './PointerIcon';
import { Box, Typography, Chip } from '@mui/material';
import { styled } from '@mui/system';

const ProfitChip = styled(Chip)({
  backgroundColor: '#4caf50',
});

const NotProfitChip = styled(Chip)({
  backgroundColor: '#ff9800',
});

const TitleChip = styled(Chip)({
  backgroundColor: '#56528D',
  color: '#ffffff',
  fontSize: '1.2rem',
  width: '100%',
});
const DescriptionTypography = styled(Typography)({
  fontSize: '1.1rem',
  backgroundColor: '#f5f5f5',
  padding: '0.5rem',
});
const CategoryChip = styled(Chip)({
  backgroundColor: '#f5f5f5',
});

export const GeneratePoint = ({ points }) => {
  return (
    <>
      {points.map((point, index) => (
        <Marker key={index} position={point} icon={PointerIcon}>
          <Popup>
            <Box>
              <Box sx={{ mt: 1 }}>
                <TitleChip label={point.name} />
              </Box>
              <Typography variant="body2">{point.city}</Typography>
              <Box sx={{ mt: 1 }}>
                <CategoryChip label={`Kategorie: ${point.categories}`} />
              </Box>
              <Box sx={{ mt: 1 }}>
                <DescriptionTypography variant="body2">{point.description}</DescriptionTypography>
              </Box>
              <Box sx={{ mt: 1 }}>{point.isProfit ? <ProfitChip label="Zyskowny" /> : <NotProfitChip label="Nie zyskowny" />}</Box>
              <Typography variant="body2">Zysk: {point.WhatProfit}</Typography>
              <Typography variant="body2">Dodatkowe informacje: {point.additionalInfo}</Typography>
            </Box>
          </Popup>
        </Marker>
      ))}
    </>
  );
};
