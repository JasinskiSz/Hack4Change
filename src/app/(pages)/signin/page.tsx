'use client';

import React, { FormEvent, useReducer, useState } from 'react';
import { TextField, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

const SignInPage = () => {
  const [formInput, setFormInput] = useState({ email: '', password: '' });

  function handleSignIn(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { email, password } = formInput;
    console.log({ email });
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Grid
        item
        xs={3}
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSignIn}
      >
        <Stack direction="column" justifyContent={'center'} spacing={2} padding={4} maxWidth={460}>
          <h2 style={{ textAlign: 'center', color: '#56528D' }}>Rejestracja</h2>
          <FormControl style={{ gap: '20px' }}>
            <TextField required id="outlined-required" name="email" value={formInput.email} onChange={handleInput} label="email" />
            <TextField
              id="outlined-password-input"
              name="password"
              value={formInput.password}
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={handleInput}
            />
            <Button variant="contained" size="large" type="submit">
              Zarejestruj
            </Button>
          </FormControl>
        </Stack>
      </Grid>
    </>
  );
};

export default SignInPage;
