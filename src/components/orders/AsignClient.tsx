import { useEffect, useState } from 'react'
import Select from 'react-select'

const clients = [
  { id: '1', name: 'Juan' },
  { id: '2', name: 'Pedro' },
  { id: '3', name: 'Oscar' }
]

const AsignClient = () => {
  const [currentClients, setClient] = useState([])

  useEffect(() => {
    console.log('client', currentClients)
  }, [currentClients])

  const selectClients = (selectedClients: any) => setClient(selectedClients)

  return (
    <Select
      getOptionLabel={optionsLabel => optionsLabel.name}
      getOptionValue={optionsValue => optionsValue.id}
      isMulti
      noOptionsMessage={() => 'No hay resultados'}
      onChange={selectedClients => selectClients(selectedClients)}
      options={clients}
      placeholder="Busque o seleccione el cliente"
    />
  )
}

export default AsignClient
