import React from 'react'
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import { getBacklog } from '../../API/Backlog';

export default function Backlog() {


  const { data:backlogList=[] } = useSWR("backlog", getBacklog);
  
  const navigate = useNavigate();

  return (
    <div>
      <h6>Backlog:</h6>
      <table className='table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {backlogList.map((ele) => {
            return (
              <tr key={ele.issue_id}>
                <td>{ele.issue_id}</td>
                <td onClick={()=>navigate(`/edit/${ele.issue_id}`)}>{ele.title}</td>
                <td>{ele.cat_name}</td>
                <td>{ele.priority_name}</td>
                <td>{ele.description}</td>
              </tr>
            )
          })}
        </tbody> 
      </table>
    </div>
  )
}
