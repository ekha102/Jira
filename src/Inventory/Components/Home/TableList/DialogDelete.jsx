import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { mutate } from 'swr';
import { getDeletedId } from '../../../API/InventoriesData';



export default function DialogDelete( {open, setOpen, deletedItem, setSearchTerm} ) {


  const handleDeletedDialog = async () => {
    // console.log(deletedItem);
    try {
      await getDeletedId(deletedItem.id);
      setOpen(false);
      setSearchTerm("");
      mutate('inventories');
    } catch (error) {
      throw error;
    }
  }


  return (
    <Dialog hideBackdrop open={open} 
    onClose={() => setOpen(false)}
    >
      <DialogTitle>Delete the item</DialogTitle>
      <DialogContent>Do you want to delete the {deletedItem.itemName}?</DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" 
        onClick={() => setOpen(false)}
        >No</Button>
        <Button variant="contained" color="error"
          onClick={handleDeletedDialog}
        >Yes</Button>
      </DialogActions>
    </Dialog>
  )
}
