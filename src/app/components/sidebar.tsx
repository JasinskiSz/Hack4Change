import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';

const Sidebar = () => {
  const [visible, setVisible] = useState(true);

  const toggleSidebar = () => setVisible(!visible);

  const onAddPoint = () => {
    // Tutaj możesz zaimplementować logikę dodawania punktu
    console.log('Dodaj punkt');
  };

  return (
    <div>
      <IconButton onClick={toggleSidebar} style={{ position: 'fixed', right: 0, zIndex: 10000, width: 48, height: 48 }}>
        <MenuIcon fontSize="large" />
      </IconButton>
      {visible && (
        <div className="sidebar">
          <Button onClick={onAddPoint} color="primary" style={{ width: 48, height: 48 }} startIcon={<AddIcon fontSize="large" />}>
            Dodaj punkt
          </Button>
        </div>
      )}
      <style jsx>{`
        .sidebar {
          position: fixed;
          width: 200px;
          height: 100vh;
          right: 0;
          top: 0;
          background-color: #f5f5f5;
          padding: 20px;
          z-index: 9999;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
