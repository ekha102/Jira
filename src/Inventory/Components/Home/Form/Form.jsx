import React, { useEffect, useState } from 'react'
import { FormHelperText, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { Controller, useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { getFormData, updateFormItemById } from '../../../API/InventoriesData'
import { mutate } from 'swr'
import dayjs from "dayjs";



export default function Form( {editForm, btnChange, setBtnChange} ) {

  // const currentDate = dayjs(); 
  // const formattedDate = currentDate.format('YYYY-MM-DD h:mm A'); 
  

  const formInput = object({
    itemName: string().required("Item name must be required."),
    quantity: string().required("Quantity must be has a number"),
    alert: string().required("Alert must be has a number"),
  })


  const { register, handleSubmit, formState: { errors }, control, reset, setValue,} = useForm({
    defaultValues: {
      id: "",
      createDate: new Date(),
      updateDate: "",
      itemName: "",
      quantity: "",
      alert: "",
      comment: "",
      checkInDate: "",
      checkOutDate: ""
    },
    resolver: yupResolver(formInput),
    mode: "onTouched",
  });



  // Add and Edit
  const onSubmit = async (values) => {
    const { id, ...newValues} = values;
    const options = id ? updateFormItemById(id, newValues) : getFormData(newValues)
    // let options = ""
    // if (id) {
    //   options = updateFormItemById(id, newValues);
    //   setBtnChange(false);
    // } else {
    //   options = getFormData(newValues);
    //   // console.log(setBtnChange(!btnChange));
    //   setBtnChange(false);
    // }
    try {
      await options;
      mutate('inventories');
      setBtnChange(false);
      reset();
    } catch (error) {
      
    }
  }

  const handleReset = () => {
    reset();
    setBtnChange(false);
  }

  const onError = (errors) => {
    console.log(errors);
  }

  useEffect(() => {
    if(editForm) {
      setValue('id', editForm.id);
      setValue('quantity', editForm.quantity);
      setValue('itemName', editForm.itemName);
      setValue('alert', editForm.alert);
      setValue('comment', editForm.comment);
      setValue('updateDate', new Date());
      // eslint-disable-next-line
    }
  }, [editForm]);
  



  return (
    <div>

      <h5>Enter the item</h5>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="mb-3">
          <Controller
            control={control}
            name="itemName"
            render={({ field, fieldState: {error} }) => (
              <TextField {...field} id="outlined-basic" label="Name of item" variant="outlined" {...register("itemName")} error={!!error}
              />
            )}
          />
          {errors.itemName && <FormHelperText error>{errors.itemName.message}</FormHelperText>}
        </div>

      
        <div className="mb-3">
          <Controller 
          control={control} 
          name="quantity" 
          render={({ field, fieldState: { error } }) => (
            <TextField {...field} id="outlined-basic" label="Quantity" variant="outlined" {...register("quantity")} error={!!error} />
            )}
          />  
          {errors.quantity && <FormHelperText error>{errors.quantity.message}</FormHelperText>}
        </div>


        <div className="mb-3">
          <Controller control={control} name="alert" render={( {field, fieldState: { error }} ) => (
            <TextField {...field} id="outlined-basic" label="Alert item" variant="outlined" {...register("alert")} error={!!error} />
          )}
          />
          {/* <TextField id="outlined-basic" label="Alert item" variant="outlined" {...register("alert")} error={!!errors.alert} /> */}
          {errors.alert && <FormHelperText error>{errors.alert.message}</FormHelperText>}
        </div>


        <div className="mb-3">
          <Controller control={control} name="comment" render={({field}) => (
            <TextField {...field} id="outlined-basic" label="Comment" variant="outlined" {...register("comment")} />
          )}
          />

          {/* <TextField id="outlined-basic" label="Comment" variant="outlined" {...register("comment")} /> */}
        </div>

        

        {/* <Button type="submit" variant="contained" color="success">Submit</Button> */}
        <Button className="me-1" type="submit" variant="contained" color={btnChange ? "primary" : "success"}>{btnChange ? "Update" : "Submit"}</Button>
        {/* {error && <p>{error}</p>} */}
        <Button type='reset' variant="contained" color="error" onClick={handleReset}>Reset</Button>
      </form>

    </div>
  )
}
