import React
, { useState }
  from 'react'
import Form from './Form/Form'
import TableList from './TableList/TableList'
import { getFormItemId } from '../../API/InventoriesData'


export default function Home() {
  const [selectedItem, setSelectedItem] = useState(null)

  const [btnChange, setBtnChange] = useState(false);

  

  // Function Edit form:
  const handleEditForm = async (itemId) => {
    const selectedItem = await getFormItemId(itemId);
    setSelectedItem(selectedItem);
    setBtnChange(true);
    // console.log(selectedItem); // Get the Id for update form
  }



  return (
    <div>
      <Form editForm={selectedItem} btnChange={btnChange} setBtnChange={setBtnChange} />
      <hr />
      <TableList handleEditForm={handleEditForm} />

    </div>
  )
}