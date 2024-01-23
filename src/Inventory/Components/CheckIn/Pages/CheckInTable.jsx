import React, { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import { getFormItemId, getInventories, updateFormItemById } from '../../../API/InventoriesData'
import dayjs from "dayjs";
import { Button, Dialog, DialogActions, DialogTitle, TextField, DialogContentText } from '@mui/material';
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// import DialogContentText from '@mui/material/DialogContentText';


export default function CheckInTable() {
  const [open, setOpen] = useState(false);
  // console.log(open);
  const [updatedItemId, setUpdatedItemId] = useState("");

  const { data: checkInData = [] } = useSWR("checkIn", getInventories);

  


  const formInput = object({
    itemName: string().required("Item name must be required."),
    quantity: string().required("Quantity must be has a number"),
    alert: string().required("Alert must be has a number"),
  })


  const { register, handleSubmit, formState: { errors }, control, reset, setValue, values } = useForm({
    defaultValues: {
      id: "",
      itemName: "",
      quantity: "",
      comment: "",
      checkInDate: ""
    },
    resolver: yupResolver(formInput),
    mode: "onTouched",
  });

  // const onSubmit = () => {
  //   // console.log(object);
  // }



  const handleUpdateItemId = async (itemId) => {
    setOpen(true);
    // console.log(itemId); 1
    const selectedItem = await getFormItemId(itemId);
    console.log(selectedItem);
    setValue('id', selectedItem.id);
    setValue('itemName', selectedItem.itemName);
    setValue('quantity', selectedItem.quantity);
    setValue('comment', selectedItem.comment);
    setUpdatedItemId(itemId);
  }


  const onSubmit = () => {
    console.log("Testing");
    setOpen(false)
  }

  // const onSubmit = async (updatedItemId, values) => {
  //   try {
  //     await updateFormItemById(updatedItemId, values);
  //     mutate('inventories');
  //   } catch (error) {
  //   }

  // }




  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Check-In Date</th>
            <th>Comment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {checkInData.map((ele) => {
            const time = dayjs(ele.checkInDate).format("MM-DD-YYYY");
            return (
              <tr key={ele.id}>
                <td>{ele.id}</td>
                <td>{ele.itemName}</td>
                <td>{ele.quantity}</td>
                <td>{time}</td>
                <td>{ele.comment}</td>
                <td>
                  <Button variant="contained" size="small" color="success" onClick={() => handleUpdateItemId(ele.id)} >Check In</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>


      {/* Dialog place here  */}
      <Dialog
        hideBackdrop
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Check Out Item</DialogTitle>
        <form
          // onSubmit={(e) => {
          //   e.preventDefault()
          //   handleSubmit(onSubmit)
          //   console.log("123");
          //   console.log(e);
          // }}
          // onSubmit={(e) => {
            // e.preventDefault()
            // handleSubmit(onSubmit)
            // console.log("123");
            // console.log(e);
          // }}
          // onSubmit={handleSubmit()}
        >
          <div className="mb-3">
            <Controller
              control={control}
              name="itemName"
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} id="outlined-basic" label="Name of item" disabled variant="outlined" {...register("itemName")} error={!!error}
                />
              )}
            />
            {/* {errors.itemName && <FormHelperText error>{errors.itemName.message}</FormHelperText>} */}
          </div>


          <div className="mb-3">
            <Controller
              control={control}
              name="quantity"
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} id="outlined-basic" label="Quantity" variant="outlined" {...register("quantity")} error={!!error} />
              )}
            />
            {/* {errors.quantity && <FormHelperText error>{errors.quantity.message}</FormHelperText>} */}
          </div>

          <div className="mb-3">
            <Controller control={control} name="comment" render={({ field }) => (
              <TextField {...field} id="outlined-basic" label="Comment" variant="outlined" {...register("comment")} />
            )}
            />
          </div>

          <DialogActions>
            <Button onClick={() => setOpen(false)} >No</Button>
            <Button type="submit" className="me-1" variant="contained">Update</Button>
          </DialogActions>
            
          
        </form>
      </Dialog>

    </div>
  )
}







