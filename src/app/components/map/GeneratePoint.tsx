'use strict';
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { PointerIcon, orangeIcon, redIcon, greenIcon } from './PointerIcon';
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
      {points.map((point, index) => {
        let icon;
        switch (point.name.toLowerCase()) {
          case 'biedronka':
            icon = PointerIcon;
            break;
          case 'żabka':
            icon = greenIcon;
            break;
          case 'rtv euro agd':
          case 'mediamarkt':
            icon = redIcon;
            break;
          case 'paczkomat':
          case 'leroy merlin':
          case 'castorama':
            icon = orangeIcon;
            break;
          default:
            icon = PointerIcon;
        }

        return (
          <Marker key={index} position={point} icon={icon}>
            <Popup>
              <Box>
                <Box sx={{ mt: 1 }}>
                  <TitleChip label={point.name} />
                </Box>
                <Typography variant="body2">{point.adress}</Typography>
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
        );
      })}
    </>
  );
};
