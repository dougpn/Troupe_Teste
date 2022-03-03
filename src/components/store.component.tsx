import React, { useState, MouseEvent, useEffect, useCallback } from 'react'
import { Button, Card, Container, Header, Input, Loader, Menu, Modal, Segment, Visibility } from 'semantic-ui-react'
import { useAppDispatch } from '../hooks'
import { ExcluirCliente, ProcurarClientes } from '../services/api'
import { useHistory } from 'react-router-dom'

interface User {
  id: number,
  nome: string,
  cpf: string,
  email: string,
  endereco: {
      cep: Number,
      rua: string,
      numero: Number,
      bairro: string,
      cidade: string,
  }
}

export default function Store() {
  const [isOpen, setIsOpen] = useState(false)
  const [incidents,setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(0)
  const [search, setSearch] = useState('')

  const [fixed, setFixed] = useState(false);

  const fetchData = async () => {
    const Clients = await ProcurarClientes(search)
    const data =  await Clients.json()
    setIncidents(data)
  };

  const history = useHistory()
    const redirect = useCallback((rota, state?) => history.push(rota, state), [history])
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setLoading(true)
      setSearch(e.target.value)
    }

  const dispatch = useAppDispatch()
  const showModal = () => {
    dispatch({ type: 'SIGN_OUT' })
    localStorage.clear();
  }
  
  const show = (id: React.SetStateAction<number>) => {
    setId(id)
    setIsOpen(true)
  }

  const hideModal = () => {
    setIsOpen(false)
  }

  const showFixedMenu = () => {
    setFixed(true)
  }

  const hideFixedMenu = () => {
    setFixed(false)
  }

  useEffect(() => {
    fetchData()
    return () => {
      setLoading(false);
    };
  }, [incidents]); 
  
  const clickHandler = (event: MouseEvent) => {
    event.preventDefault()
    ExcluirCliente(id)
      .then(() => {
        hideModal()
      })
      .catch((e) => {
        console.log('Deu erro', e)
      })
  }

 
  const ClientComponent = (user: User) => (  
    <Card key={user.id}>
      <Card.Content>
        <Card.Header>{user.nome}</Card.Header>
        <Card.Meta>{user.cpf}</Card.Meta>
        <Card.Description>
        Email: {user.email} <br />
        Cidade: {user.endereco.cidade}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button onClick={() => redirect('/client', user)} color='green'>
            Editar
          </Button>
          <Button onClick={() => show(user.id)} color='red'>
            Excluir
          </Button>
        </div>
      </Card.Content>
    </Card>
  )
 
  return (
    <>
    <Modal
      basic 
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
      size="small"
      >
        <Header textAlign='center'>
          Tem certeza que deseja excluir o registro?
        </Header>
        <Modal.Actions align='center'>
          <Button onClick={hideModal}>Cancelar</Button>
          <Button onClick={clickHandler}>Excluir</Button>
        </Modal.Actions>
      </Modal>
    <Visibility
          once={false}
          onBottomPassed={showFixedMenu}
          onBottomPassedReverse={hideFixedMenu}
        >
          <Segment
            textAlign='center'
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : undefined}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
                <Menu.Item position='right'>
                  <Button 
                    as='a' 
                    inverted={!fixed}
                    onClick={() => redirect('/client')}>
                    Novo Cliente
                  </Button>
                  <Button 
                   inverted={!fixed} 
                   primary={fixed} 
                   style={{ marginLeft: '0.5em' }}
                   onClick={showModal}
                   >
                    Deslogar
                  </Button>
                </Menu.Item>
            </Menu>
          </Segment>
          </Visibility>
          <Segment
            textAlign='center'
            size='mini'
            vertical
          >
            <Input            
              value={search}
              onChange={handleChange} />
          </Segment>
    <Loader active={loading} />
    <Container fluid>
    <Card.Group>
      {incidents.map(ClientComponent)}
    </Card.Group>
    
    </Container>
    </>
  )
}
