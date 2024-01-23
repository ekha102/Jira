import React, { useEffect, useState } from 'react'
// import { DataGrid } from '@mui/x-data-grid';
import { getInventories } from '../../../API/InventoriesData';
import { Button, TextField } from '@mui/material';
import useSWR, { mutate } from 'swr';
import DialogDelete from './DialogDelete';
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/ClearOutlined";


export default function TableList({ handleEditForm }) {

  const [open, setOpen] = useState(false);
  const [selectDeletedItem, setselectDeletedItem] = useState("");

  
  const { data: inventories = [], isLoading } = useSWR("inventories", () => getInventories("itemName", searchTerm));
  
  // Only display 10 latest data in the table:
  const inventoriesSlice = inventories.slice(-10);


 

  const handleDeletedSelectedItem = (deleteItem) => {
    // console.log(deleteItem);
    setselectDeletedItem(deleteItem);
    setOpen(true);
  }
 

  



  // Search Item in the tableList:
  // inventories == API 
  // searchItem ==> 
 
  // Search Item
  // const handleSearchItem = (searchItem) => {
  //   // console.log(searchItem);
  //   setSearchTerm(searchItem);
  // }



  
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchItem = (e) => {
    // setFilteredLocations(e.target.value);
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  


  useEffect(() => {
    mutate('inventories')
  }, [searchTerm])


  if (isLoading) {
    return (<h1>Loading...</h1>)
  }

  


  return (
    // Using the Bootstrap
    <div>
      <div>
        <TextField label="Search Item"
          // onChange={(evt) => handleSearchItem(evt.target.value)}
          onChange={handleSearchItem}
          value={searchTerm}
          InputProps={{
            endAdornment: (
              <IconButton onClick={clearSearch} edge="end">
                <ClearIcon />
              </IconButton>
            )
          }}
        />
      </div>

      <i>Only display 10 latest data for table</i>

      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name of Item</th>
            <th>Quantity</th>
            <th>Alert</th>
            <th>Comment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* used the reverse fn to display latest on bottle to top  */}
          {inventoriesSlice.reverse().map((inventory, idx) => {
            return (
              <tr key={inventory.id}>
                <td>{idx+1}</td>
                <td>{inventory.itemName}</td>
                <td>{inventory.quantity}</td>
                <td>{inventory.alert}</td>
                <td>{inventory.comment}</td>
                <td>
                  <Button className="me-1" variant="contained" size="small"
                    onClick={() => { handleEditForm(inventory.id) }}
                  >Edit</Button>
                  <Button variant="contained" color="error" size="small"
                    // onClick={()=>handleDeletedItem(inventory.id)} 
                    // onClick={() => setOpen(true)} 
                    // onClick={ ()=>{handleDeletedItem(inventory.id)} }
                    onClick={ ()=>handleDeletedSelectedItem(inventory) }
                  >Del</Button>

                </td>
              </tr>
            );
          })}

        </tbody>

      </table>

      {/* <Button onClick={()=>setOpen(true)}>Delete</Button> */}
        
      {open ? <DialogDelete open={open} setOpen={setOpen} deletedItem={selectDeletedItem} setSearchTerm={setSearchTerm}  /> : false}
      


    </div>
  )
}
