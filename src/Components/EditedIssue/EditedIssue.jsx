import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import { useNavigate, useParams } from 'react-router-dom';


import { FormHelperText, MenuItem, TextField, Button } from '@mui/material'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form'

import { getMonths } from '../../API/IssuesData';
import { getDays, getLocations, getPriority, getStatus } from '../../API/Created';
import { getFormIssueId, updateFormIssueById } from '../../API/UpdateIssue';
import { getCats } from '../../API/Category';



export default function EditedIssue() {

  const { issueId } = useParams();
  // console.log(issueId);

  // issueId has passed in the useSWR for the first, but issueId is able to push issueId in useSWR on forward in line 41 for useEffect. That why need to add issueId in the useWSR for parameter in able to have dependency here.
  const { data: issueIdForm = [], isLoading } = useSWR(('editForm', issueId), () => getFormIssueId(issueId));

  const { data: monthList = [] } = useSWR("monthList", getMonths);
  const { data: priorityList = [] } = useSWR("priorityList", getPriority);
  const { data: statusList = [] } = useSWR("statusList", getStatus);
  const { data: dayList = [] } = useSWR("dayList", getDays);
  const { data: locationList = [] } = useSWR("locationList", getLocations);
  const { data: catsList = [] } = useSWR("categories", getCats);




  const formInput = object({
    title: string().required("Item name must be required."),
  });

  const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
    defaultValues: {
      issue_id: "",
      title: "",
      cat_id: "",
      month_id: "",
      priority_id: "",
      status_id: "",
      day_id: "",
      loc_id: "",
      description: "",
    },
    resolver: yupResolver(formInput),
    mode: "onTouched",
  });



  useEffect(() => {
    if (issueId && issueIdForm.length) {
      reset({
        issue_id: issueIdForm[0].issue_id,
        title: issueIdForm[0].title,
        cat_id: issueIdForm[0].cat_id,
        month_id: issueIdForm[0].month_id,
        priority_id: issueIdForm[0].priority_id,
        status_id: issueIdForm[0].status_id,
        day_id: issueIdForm[0].day_id,
        loc_id: issueIdForm[0].loc_id,
        description: issueIdForm[0].description,
      })
    }

  }, [issueId, issueIdForm]);

  const navigate = useNavigate();



  const onError = (errors) => {
    // console.log(errors);
  }

  // const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const { item_id } = values;
      await updateFormIssueById(item_id, values)
      navigate('/');
      
    } catch (error) {
      console.log(error);
    }
  }
      
  if (isLoading) {
    return (<h1>Loading...</h1>);
  }



  return (
    <div className="container-fluid">
      <h5>Update form:</h5>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {/* ID form  */}
        <div className="mb-3">
          <Controller
            control={control}
            name="issue_id"
            render={({ field, fieldState: { error } }) => (
              <TextField {...field} id="outlined-basic" label="ID" disabled={true} variant="outlined" {...register("issue_id")} error={!!error}
              />
            )}
          />
          {errors.issue_id && <FormHelperText error>{errors.issue_id.message}</FormHelperText>}
        </div>

        {/* Issue Name  */}
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
              <TextField select {...field} sx={{ minWidth: 210 }}
                id="demo-simple-select-filled" label="Categories" variant="outlined"  {...register("cat_id")} error={!!error} >
                {catsList.map((ele) => {
                  return (
                    <MenuItem key={ele.cat_id} value={ele.cat_id}>{ele.cat_name}</MenuItem>
                  );
                })}
              </TextField>
            )}
          />
          {errors.cat_id && <FormHelperText error>{errors.cat_id.message}</FormHelperText>}
        </div>

        {/* Select option for Month  */}
        <div className="mb-3">
          <Controller
            control={control}
            name="month_id"
            render={({ field, fieldState: { error } }) => (
              <TextField select {...field} sx={{ minWidth: 210 }}
                id="demo-simple-select-filled" label="Month" variant="outlined"  {...register("month_id")} error={!!error} >
                {monthList.map((ele) => {
                  return (
                    <MenuItem key={ele.month_id} value={ele.month_id}>{ele.month_name}</MenuItem>
                  );
                })}
              </TextField>
            )}
          />
          {errors.month_id && <FormHelperText error>{errors.month_id.message}</FormHelperText>}
        </div>


        {/* Select option for Priority */}
        <div className="mb-3">
          <Controller
            control={control}
            name="priority_id"
            render={({ field, fieldState: { error } }) => (
              <TextField select {...field} sx={{ minWidth: 210 }}
                id="demo-simple-select-filled" label="Month" variant="outlined"  {...register("priority_id")} error={!!error} >
                {priorityList.map((ele) => {
                  return (
                    <MenuItem key={ele.priority_id} value={ele.priority_id}>{ele.priority_name}</MenuItem>
                  );
                })}
              </TextField>
            )}
          />
          {errors.priority_id && <FormHelperText error>{errors.priority_id.message}</FormHelperText>}
        </div>

        {/* Select option for Status */}
        <div className="mb-3">
          <Controller
            control={control}
            name="status_id"
            render={({ field, fieldState: { error } }) => (
              <TextField select {...field} sx={{ minWidth: 210 }}
                id="demo-simple-select-filled" label="Status" variant="outlined"  {...register("status_id")} error={!!error} >
                {statusList.map((ele) => {
                  return (
                    <MenuItem key={ele.status_id} value={ele.status_id}>{ele.status_name}</MenuItem>
                  );
                })}
              </TextField>
            )}
          />
          {errors.status_id && <FormHelperText error>{errors.status_id.message}</FormHelperText>}
        </div>

        {/* Select option for day */}
        <div className="mb-3">
          <Controller
            control={control}
            name="day_id"
            render={({ field, fieldState: { error } }) => (
              <TextField select {...field} sx={{ minWidth: 210 }}
                id="demo-simple-select-filled" label="Day" variant="outlined"  {...register("day_id")} error={!!error} >
                {dayList.map((ele) => {
                  return (
                    <MenuItem key={ele.day_id} value={ele.day_id}>{ele.day_name}</MenuItem>
                  );
                })}
              </TextField>
            )}
          />
          {errors.day_id && <FormHelperText error>{errors.day_id.message}</FormHelperText>}
        </div>

        {/* Select option for Location */}
        <div className="mb-3">
          <Controller
            control={control}
            name="loc_id"
            render={({ field, fieldState: { error } }) => (
              <TextField select {...field} sx={{ minWidth: 210 }}
                id="demo-simple-select-filled" label="Location" variant="outlined"  {...register("loc_id")} error={!!error} >
                {locationList.map((ele) => {
                  return (
                    <MenuItem key={ele.loc_id} value={ele.loc_id}>{ele.loc_name}</MenuItem>
                  );
                })}
              </TextField>
            )}
          />
          {errors.loc_id && <FormHelperText error>{errors.loc_id.message}</FormHelperText>}
        </div>

        {/* description form  */}
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

        <Button type='submit' variant="contained" color="success">Update</Button>
      </form>



    </div>
  )
}
