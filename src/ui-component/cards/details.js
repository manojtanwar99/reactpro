import React from 'react';
import './card.css'
// import Card from 'react-bootstrap/Card'

export default class Details extends React.Component {

    constructor(props) {
        super(props)
        this.detailsInfo = this.props.data.filter((item) => item.id.toString() === this.props.match.params.id)
        this.data = this.detailsInfo[0]

    }


    render() {
        return (

            // <Card style={{ width: '28rem', margin: "10px", display: "inline-block" }}>

            //     {this.data && this.data.url ? <Card.Img variant="top" src={this.data.url} /> : <Card.Img variant="top" src="https://www.superherodb.com/pictures2/portraits/10/100/1508.jpg" />}
            //     <Card.Body>
            //         <Card.Title>{this.data.name}</Card.Title>
            //         <Card.Text>
            //             {this.data["full-name"]}
            //             <br></br>
            //             {this.data["place-of-birth"]}
            //             <br></br>
            //             {this.data.publisher}

            //         </Card.Text>

            //     </Card.Body>
            // </Card>
            <div className="card">

                {this.data && this.data.url ? <img src={this.data.url} alt="Avatar"  /> : <img src="https://www.superherodb.com/pictures2/portraits/10/100/1508.jpg" alt="Avatar"  />}

                <div className="container">
                    <h4><b>{this.data["full-name"]}</b></h4>
                    <p>{this.data["place-of-birth"]}</p>
                    <br></br>
                    <p>{this.data.publisher}</p>
                </div>
            </div>

        );

    }

}

