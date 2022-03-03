export function Logar(formData: Object) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          }
        return fetch('http://localhost:5000/login', requestOptions);
      }

export function CriarCliente(formData: Object) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          }
        return fetch('http://localhost:5000/clientes', requestOptions);
      }
export function EditarCliente(formData: Object, id: number) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData) 
          }
        return fetch(`http://localhost:5000/clientes/${id}`, requestOptions);
      }
export function ExcluirCliente(id: number) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }, 
          }
        return fetch(`http://localhost:5000/clientes/${id}`, requestOptions);
      }
      export function ProcurarClientes(pesquisa: string) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }
        return fetch(`http://localhost:5000/clientes?q=${pesquisa}`, requestOptions);
      }

export function BuscarCep(id: string) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }
        return fetch(`https://viacep.com.br/ws/${id}/json/`, requestOptions);
      }