import React, { useState, useCallback, useEffect } from 'react'
import { CriarCliente, EditarCliente, BuscarCep } from '../services/api';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom'
import InputMask from "react-input-mask";


import { Button, Form, Grid, Icon, Segment } from 'semantic-ui-react'

interface User {
    id: number,
    nome: string,
    cpf: string,
    email: string,
    endereco: {
        cep: any,
        rua: string,
        numero: any,
        bairro: string,
        cidade: string,
    }
  }

const Client = () => {
const location = useLocation<User>()
  const [formData, setFormData] = useState({
        nome: location.state?.nome || '',
        cpf: location.state?.cpf || '',
        email: location.state?.email || '',
        endereco: {
            cep: location.state?.endereco?.cep || '',
            rua: location.state?.endereco?.rua || '',
            numero: location.state?.endereco?.numero || '',
            bairro: location.state?.endereco?.bairro || '',
            cidade: location.state?.endereco?.cidade || '',
        }
})
 const [id,setId] = useState(0)
 const [loading,setLoading] = useState(false)

useEffect(() => {
    setLoading(true);
    const bootstrapAsync = async () => {
     if(location.state){
        setId(location.state.id)
     }
    }; 
    bootstrapAsync();
    return () => {setLoading(false)}
  },[location.state]);


function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setFormData({...formData, [e.target.name] : e.target.value})
}

async function Blur () {
    const resp = await BuscarCep(formData.endereco.cep)
    const data = await resp.json()
    setFormData({...formData, endereco: {...formData.endereco,
        rua : data.logradouro, 
        bairro : data.bairro, 
        cidade : data.localidade}, })
}

async function handleChangeEnd(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace('-', '')
    setFormData({...formData, endereco: {...formData.endereco, [e.target.name] : value}, })
}

const history = useHistory()
const redirect = useCallback((rota) => history.push(rota), [history])

const clickHandler = async (event: React.FormEvent) => {
  event.preventDefault()
  const res =  location.state ? await EditarCliente(formData,id) : await CriarCliente(formData)
  if (!res.ok) {
    return toast.error("Existem campos não preenchidos!")
  }
  redirect('/')
}
  return(
<>
    <Segment textAlign='left' vertical>
        <Icon size='large' link onClick={() => redirect('/')} name='arrow left'></Icon>
    </Segment>
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
                required
                name='nome'
                value={formData.nome}
                onChange={handleChange}
                placeholder='Digite seu nome' />
            <Form.Input 
                fluid 
                icon='id card' 
                iconPosition='left'
                required
                name='cpf'
                value={formData.cpf}
                onChange={handleChange}
                placeholder='Digite seu CPF' />
            <Form.Input 
                fluid 
                icon='mail' 
                iconPosition='left'
                required
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Digite seu e-mail' />
            <Form.Input
            as={InputMask}
                mask="99999-999"
                required
                name='cep'
                value={formData.endereco.cep}
                onChange={handleChangeEnd}
                onBlur={Blur}
                placeholder='Digite seu cep' />
            <Form.Input 
                fluid 
                icon='street view'
                iconPosition='left'
                required
                name='rua'
                value={formData.endereco.rua}
                onChange={handleChangeEnd}
                placeholder='Digite sua rua' />
            <Form.Input 
                fluid 
                icon='address card' 
                iconPosition='left'
                required
                name='numero'
                value={formData.endereco.numero}
                onChange={handleChangeEnd}
                placeholder='Digite seu número' />
            <Form.Input 
                fluid 
                icon='address card' 
                iconPosition='left'
                required
                name='bairro'
                value={formData.endereco.bairro}
                onChange={handleChangeEnd}
                placeholder='Digite seu bairro' />
            <Form.Input 
                fluid 
                icon='address card' 
                iconPosition='left'
                required
                name='cidade'
                value={formData.endereco.cidade}
                onChange={handleChangeEnd}
                placeholder='Digite sua cidade' />
          <Button color='blue' fluid size='large'>
            {location.state ? 'Editar Cliente' : 'Criar novo cliente' }
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
</>
)}

export default Client
