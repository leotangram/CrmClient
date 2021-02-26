import { useState, useEffect } from 'react'
import Select from 'react-select'
import Layout from '@/components/Layout'

const options = [
  { id: 'chocolate', name: 'Chocolate' },
  { id: 'strawberry', name: 'Strawberry' },
  { id: 'vanilla', name: 'Vanilla' }
]

const NewOrder = () => {
  const [flavors, setFlavors] = useState([])

  useEffect(() => {
    console.log('flavors', flavors)
  }, [flavors])

  const selectFlavor = (selectedFlavors: any) => setFlavors(selectedFlavors)

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">NewOrder</h1>
      <Select
        getOptionLabel={optionsLabel => optionsLabel.name}
        getOptionValue={optionsValue => optionsValue.id}
        isMulti
        noOptionsMessage={() => 'No hay resultados'}
        onChange={selectedFlavors => selectFlavor(selectedFlavors)}
        options={options}
        placeholder="Seleccione el sabor"
      />
    </Layout>
  )
}

export default NewOrder
