import React, { useState, useCallback } from 'react'
import { Logar } from '../services/api';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAppDispatch } from '../hooks';

import { Button, Form, Grid, Segment } from 'semantic-ui-react'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '', // required
    password: '', // required
})
const dispatch = useAppDispatch()

function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setFormData({...formData, [e.target.name] : e.target.value})
}

const history = useHistory()
const redirect = useCallback((rota) => history.push(rota), [history])

const clickHandler = async (event: React.FormEvent) => {
  event.preventDefault()
  const res = await Logar(formData)
  if (!res.ok) {
    return toast.error("Usuário ou senha inválidos.")
  }
  const data = await res.json();
  localStorage.setItem('token', data.accessToken)
  dispatch({ type: 'SIGN_IN', token: data.accessToken})
  redirect('/')
}
  return(
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Form 
        size='large'
        onSubmit={clickHandler}
      >
        <Segment stacked>
          <Form.Input 
            fluid 
            icon='user' 
            iconPosition='left'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Digite seu e-mail' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Digite sua senha'
            value={formData.password}
            onChange={handleChange}
            name='password'
            type='password'
            minLength={5}
          />

          <Button color='blue' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
)}

export default LoginForm
