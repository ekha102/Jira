import React from 'react'
import { Checkbox, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { Controller, useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import useSWR from 'swr'
import { useNavigate } from 'react-router-dom'
import { getMonths, getDays, getLocations, getPriority, getStatus, getCreatedIssue } from '../../API/Created'
import { getCats } from '../../API/Category'




export default function CreateJira() {

  const { data:monthsList=[] } = useSWR("month", getMonths);
  const { data:priorityList=[] } = useSWR("priority", getPriority);
  const { data:statusList=[] } = useSWR("status", getStatus);
  const { data:daysList=[] } =  useSWR("days", getDays);
  const { data:locationsList=[]} = useSWR("locations", getLocations);
  const { data:catsList=[]} = useSWR("categories", getCats);

  


  const formInput = object({
    title: string().required("Item name must be required."),
    // quantity: string().required("Quantity must be has a number"),
    // alert: string().required("Alert must be has a number"),
  })


  const { register, handleSubmit, formState: { errors }, control, reset, setValue, } = useForm({
    defaultValues: {
      title: "",
      month_id: "",
      description: "",
      priority_id: "",
      status_id: "",
      day_id: "",
      loc_id: "",
      cat_id: "",
    },
    resolver: yupResolver(formInput),
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log(values);
    try {
      await getCreatedIssue(values);
      navigate(`/`);
    } catch (error) {

    }
  }




  const onError = (errors) => {
    // console.log(errors);
  }

 


  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {/* Title  */}
        <div className="mb-3">
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState: { error } }) => (
              <TextField {...field} id="outlined-basic" label="Title" variant="outlined" {...register("title")} error={!!error}
              />
            )}
          />
          {errors.title && <FormHelperText error>{errors.title.message}</FormHelperText>}
        </div>

        {/* Categories  */}
        <div className="mb-3">
          <Controller
            control={control}
            name="cat_id"
            render={({ field, fieldState: { error } }) => (
              <TextField select
                {...field}
                sx={{ minWidth: 210 }}
                id="demo-simple-select-filled"
                label="Category"
                variant="outlined"
                {...register("cat_id")}
                error={!!error}
              >
                {/* Dynamically generate options */}
                {catsList.map((ele) => (
                  <MenuItem key={ele.cat_id} value={ele.cat_id}>
                    {ele.cat_name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {errors.cat_id && (
            <FormHelperText error>{errors.cat_id.message}</FormHelperText>
          )}
        </div>
            
        {/* Month  */}
        <div className="mb-3">
          <Controller
            control={control}
            name="month_id"
            render={({ field, fieldState: { error } }) => (
              <TextField select
                {...field}
                sx={{ minWidth: 210 }}
                id="demo-simple-select-filled"
                label="Month Name"
                variant="outlined"
                {...register("month_id")}
                error={!!error}
              >
                {/* Dynamically generate options */}
                {monthsList.map((ele) => (
                  <MenuItem key={ele.month_id} value={ele.month_id}>
                    {ele.month_name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {errors.month_id && (
            <FormHelperText error>{errors.month_id.message}</FormHelperText>
          )}
        </div>

        {/* Priority  */}
        <div className="mb-3">
          <Controller
            control={control}
            name="priority_id"
            render={({ field, fieldState: { error } }) => (
              <TextField select
                {...field}
                sx={{ minWidth: 210 }}
                id="demo-simple-select-filled"
                label="Priority Name"
                variant="outlined"
                {...register("priority_id")}
                error={!!error}
              >
                {/* Dynamically generate options */}
                {priorityList.map((ele) => (
                  <MenuItem key={ele.priority_id} value={ele.priority_id}>
                    {ele.priority_name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {errors.priority_id && (
            <FormHelperText error>{errors.priority_id.message}</FormHelperText>
          )}
        </div>

        {/* Status  */}
        <div className="mb-3">
          <Controller
            control={control}
            name="status_id"
            render={({ field, fieldState: { error } }) => (
              <TextField select
                {...field}
                sx={{ minWidth: 210 }}
                id="demo-simple-select-filled"
                label="Status Name"
                variant="outlined"
                {...register("status_id")}
                error={!!error}
              >
                {/* Dynamically generate options */}
                {statusList.map((ele) => (
                  <MenuItem key={ele.status_id} value={ele.status_id}>
                    {ele.status_name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {errors.status_id && (
            <FormHelperText error>{errors.status_id.message}</FormHelperText>
          )}
        </div>

        {/* Days  */}
        <div className="mb-3">
          <Controller
            control={control}
            name="day_id"
            render={({ field, fieldState: { error } }) => (
              <TextField select
                {...field}
                sx={{ minWidth: 210 }}
                id="demo-simple-select-filled"
                label="Day Name"
                variant="outlined"
                {...register("day_id")}
                error={!!error}
              >
                {/* Dynamically generate options */}
                {daysList.map((ele) => (
                  <MenuItem key={ele.day_id} value={ele.day_id}>
                    {ele.day_name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {errors.day_id && (
            <FormHelperText error>{errors.day_id.message}</FormHelperText>
          )}
        </div>

        {/* Locations  */}
        <div className="mb-3">
          <Controller
            control={control}
            name="loc_id"
            render={({ field, fieldState: { error } }) => (
              <TextField select
                {...field}
                sx={{ minWidth: 210 }}
                id="demo-simple-select-filled"
                label="Location Name"
                variant="outlined"
                {...register("loc_id")}
                error={!!error}
              >
                {/* Dynamically generate options */}
                {locationsList.map((ele) => (
                  <MenuItem key={ele.loc_id} value={ele.loc_id}>
                    {ele.loc_name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {errors.loc_id && (
            <FormHelperText error>{errors.loc_id.message}</FormHelperText>
          )}
        </div>
        
        {/* Description  */}
        <div className="mb-3">
          <Controller
            control={control}
            name="description"
            render={({ field, fieldState: { error } }) => (
              <TextField {...field} id="outlined-basic" label="Description" variant="outlined" {...register("description")} error={!!error} 
              fullWidth
              multiline
              rows={4}
              />
            )}
          />
          {errors.description && <FormHelperText error>{errors.description.message}</FormHelperText>}
        </div>

        <Button className="me-1" type="submit" variant="contained" color="primary">Create</Button>

      </form>
    </div>
  )
}
