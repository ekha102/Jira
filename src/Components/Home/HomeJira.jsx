import { Button, FormControl } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { getIssues } from '../../API/IssuesData';
import dayjs from 'dayjs';
import { InputLabel, MenuItem, Select} from '@mui/material'
import { getCats } from '../../API/Category';




export default function HomeJira() {
  const { data: issuesData = [], isLoading } = useSWR("issues", getIssues);
  const { data: catsList = [] } = useSWR("categories", getCats);

  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [filteredCatory, setFilteredCatory] = useState([]); 


  const handleChange = (event) => {
    const selectedValue = event.target.value;
    // console.log("Select value: ", selectedValue);
    setCategory(selectedValue);

    if (selectedValue === 'all') {
      // Logic to handle "All" selection
      // Here you might want to show all items or reset a filter
      setFilteredCatory(issuesData); // Assuming you want to show all categories
    } else {
      // Logic to handle specific category selection
      const filtered = issuesData.filter(item => item.cat_id === selectedValue);
      setFilteredCatory(filtered);
    }
  };

  // useEffect used for reflect at the first time access to page for selection called All
  useEffect(() => {
    if (category === 'all') {
      setFilteredCatory(issuesData);
    } else {
      const filtered = issuesData.filter(item => item.cat_id === category);
      setFilteredCatory(filtered);
    }
  }, [category, issuesData]);


 
  if (isLoading) {
    return (<h1>Loading...</h1>);
  }

  // Filter for todo = 1001
  const filteredByTodo = () => {
    return filteredCatory.filter(item => item.status_id === 1001);
  };

  // Filter for in progress = 1002
  const filteredByInProgress = () => {
    return filteredCatory.filter(item => item.status_id === 1002);
  }

  // Filter for done = 1003 within 15 days from today:
  const filteredByDone = () => {
    return filteredCatory.filter(item => {
      const fifteenDaysAgo = dayjs().subtract(15, 'day');
      const updateDate = dayjs(item.update_date);
      return (item.status_id === 1003 && updateDate.isAfter(fifteenDaysAgo))
      });
  }




  return (
    <div className="container-fluid">

      {/* Filter for category  */}
      <div className="mb-3">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value="all">All</MenuItem>
            {catsList.map((ele) => (
              <MenuItem key={ele.cat_id} value={ele.cat_id}>
                {ele.cat_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>


      {/* Display div for data  */}
      <div className="row">
        <div className="col-md-4">
          <h5>Todo ({filteredByTodo().length})</h5>
          {filteredByTodo().map((issue) => {
            return (
              <div key={issue.issue_id} className="card mb-2">
                <div className="card-body">
                  <h5 className="card-title">{issue.title}</h5>
                  <p className="card-text">{issue.cat_name}</p>
                  <p className="card-text">{issue.description}</p>
                  <p className="card-textp">{issue.priority_name} | {issue.day_name} | {issue.loc_name}</p>
                  <Button className="mt-2" variant="contained" size="small"
                    onClick={() => navigate(`/edit/${issue.issue_id}`)}
                  // onClick={()=>setOpenWindowUpdate(true)}
                  >Details</Button>
                </div>
              </div>
            );
          })}
        </div>


        <div className="col-md-4">
          <h5>In progress ({filteredByInProgress().length || 0})</h5>
          {filteredByInProgress().map((issue) => {
            return (
              <div key={issue.issue_id} className="card mb-2">
                <div className="card-body">
                  <h5 className="card-title">{issue.title}</h5>
                  <p className="card-text">{issue.cat_name}</p>
                  <p className="card-text">{issue.description}</p>
                  <p className="card-text">{issue.priority_name} | {issue.day_name} | {issue.loc_name}</p>
                  <Button className="mt-2" variant="contained" size="small" onClick={() => navigate(`/edit/${issue.issue_id}`)}>Details</Button>
                </div>
              </div>
            );
          })}
        </div>


        <div className="col-md-4">
          <h5>Done ({filteredByDone().length || 0})</h5>
          {filteredByDone().map((issue) => {
            return (
              <div key={issue.issue_id} className="card mb-2">
                <div className="card-body">
                  <h5 className="card-title">{issue.title}</h5>
                  <p className="card-text">{issue.cat_name}</p>
                  <p className="card-text">{issue.description}</p>
                  <p className="card-text">{issue.priority_name} | {issue.day_name} | {issue.loc_name}</p>
                  <Button className="mt-2" variant="contained" size="small"
                    onClick={() => navigate(`/edit/${issue.issue_id}`)}
                  // onClick={setOpenWindowUpdate(true)}              
                  >Details</Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  )
}
