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

            <div className="carddetail">

                {this.data && this.data.url ? <img src={this.data.url} alt="Avatar"  /> : <img src="https://www.superherodb.com/pictures2/portraits/10/100/1508.jpg" alt="Avatar"  />}

                <div className="container">
                    <h4><b>{this.data["full-name"]}</b></h4>
                    <p>{this.data["place-of-birth"]}</p>
                    <br></br>
                    <p>{this.data.publisher}</p>
                    <p>{this.data["first-appearance"]}</p>
                </div>
            </div>

        );

    }

}

