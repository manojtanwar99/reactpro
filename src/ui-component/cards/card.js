import React from 'react';
// import './card.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link,} from "react-router-dom";

export default function ActorsCard({ data }) {

    return (
        <Link to={`/reactpro/${data["id"]}`} params={data}>

            <Card className="cardhover" style={{ width: '18rem', margin: "10px", display: "inline-block" }}>

                {data.url ? <Card.Img variant="top" src={data.url} /> : <Card.Img variant="top" src="https://www.superherodb.com/pictures2/portraits/10/100/1508.jpg" />}
                <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>
                        {data["full-name"]}
                        <br></br>
                        {data["place-of-birth"]}
                        <br></br>
                        {data.publisher}

                    </Card.Text>
                    <Button variant="primary" className="detail-btn" >More Details</Button>
                </Card.Body>
            </Card>

        </Link>
    )


}