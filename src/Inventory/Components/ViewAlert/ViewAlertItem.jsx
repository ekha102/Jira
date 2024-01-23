import React from 'react'
import useSWR from 'swr'
import { getInventories } from '../../API/InventoriesData'
import { useNavigate } from 'react-router-dom';


export default function ViewAlertItem() {
  
  const {data: alertTableList=[], isLoading} = useSWR(["alertTable"], getInventories);
  const navigate = useNavigate();


  // Total of item inventory
  const totalItems = alertTableList.reduce((result, item) => {
    return result + Number(item.quantity);
  }, 0);
  // console.log(totalItems);



  if (isLoading) {
    return (<h1>Loading...</h1>);
  }

  return (
    <div>
      <h5 className="text-center mt-4">Alert View Items</h5>
      <p>Total Items: {totalItems}</p>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name of Item</th>
            <th>Quantity</th>
            <th>Alert</th>
            <th>Status Item</th>
            
          </tr>
        </thead>
        <tbody>
          {alertTableList.map((item)=>{
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td onClick={()=>{navigate(`/view-alert/${item.id}`)}}>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>{item.alert}</td>
                <td style={{ color: Number(item.quantity) >= Number(item.alert) ? 'green' : 'red' }}>{Number(item.quantity) >= Number(item.alert) ? "High":"Low"}</td>
              </tr>
            );
          })}
          
        </tbody>
      </table>
    </div>
  )
}
