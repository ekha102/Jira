import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getInventories } from '../../../API/InventoriesData';
import useSWR from 'swr';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dayjs from "dayjs";




export default function DetailItem() {

  const [titleItem, setTitleItem]= useState("Testing");
  // console.log(titleItem);
  
  const { itemId } = useParams();
  // console.log(itemId);



  const { data: detailItem = [] } = useSWR("itemDetail", () => getInventories("id", itemId));
  console.log(detailItem);
 


  return (
    <div className="container">
      <h5>Detail Item: {titleItem}</h5>
      {detailItem.map((ele) => {
        //Format the date to display user friendly:
        const createDate = dayjs(ele.createDate).format("DD-MMM-YYYY");
        const updateDate = dayjs(ele.updateDate).format("DD-MMM-YYYY @ h:mm a"); 
        const checkInDate = dayjs(ele.checkInDate).format("MM-DD-YYYY @ h:mm a");
        const checkOutDate = dayjs(ele.checkOutDate).format("MM-DD-YYYY @ h:mm a");

        // get the Title name of the product to display on top of the page:
        

        return (
          <Container fluid="sm, md, lg" key={ele.id}>
            <Row>
              <Col xm={1}>ID:</Col>
              <Col>{ele.id}</Col>
            </Row>
            <Row>
              <Col xm={1}>Created Date:</Col>
              <Col>{createDate}</Col>
            </Row>
            <Row>
              <Col xm={1}>Updated Date:</Col>
              <Col>{updateDate}</Col>
            </Row>
            {/* <Row>
              <Col xm={1}>Name of Item:</Col>
              <Col>{ele.itemName}</Col>
            </Row> */}
            <Row>
              <Col xm={1}>Quantity:</Col>
              <Col>{ele.quantity}</Col>
            </Row>
            <Row>
              <Col xm={1}>Alert:</Col>
              <Col>{ele.alert}</Col>
            </Row>
            <Row>
              <Col xm={1}>Desc:</Col>
              <Col></Col>
            </Row>
            <Row>
              <Col xm={1}>Comment:</Col>
              <Col>{ele.comment}</Col>
            </Row>
            <Row>
              <Col xm={1}>Check-In Date:</Col>
              <Col>{checkInDate}</Col>
            </Row>
            <Row>
              <Col xm={1}>Check-Out Date:</Col>
              <Col>{checkOutDate}</Col>
            </Row>
          </Container>
        );
      })}

      <hr/>
      <h5>Location of Item:</h5>


    </div>
  )
}
