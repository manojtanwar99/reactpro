import React, { useState, useEffect, useRef } from 'react';
import './card.css'
import Details from './details'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import debounce from "lodash.debounce";

import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route

} from "react-router-dom";

import { throttle } from "lodash";
export default function Carts() {
  
  const [value, setValue] = useState("")
  const [orignalActorArr, setorignalActorArr] = useState([])
  const [loader, setloader] = useState(false)
  const [cardsArr, setcardsArr] = useState([])
  let results = []
  // let orignalActorArr=[];
  let actorArr = [];
  let total;

  const setResposneData = (data, start, end) => {
    return data.splice(start, end);
  }
  
  useEffect(() => throttled.current(value), [value]);

  const throttled = useRef(throttle((newValue) => {
    if (newValue) {
      getDataByFilter(newValue)
    } else if (newValue === "") {
      getDataByFilter("a")
    }

  }, 3000));

  function getDataByFilter(value) {


    setloader(true)
    if (localStorage.getItem("actors") && value === "a") {
      let result = JSON.parse(localStorage.getItem("actors"))
      setorignalActorArr(result)
      setcardsArr(setResposneData(result, 0, 12))
      setloader(false)
      return
    }

    fetch('https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/3070399882980494/search/' + value).then(function (response) {
      return response.json().then(function (response) {

        if (response.results && response.results.length > 0) {

          results = response.results.map((item, i) => { return { ...item.image, ...item.biography, "id": i } });
          //orignalActorArr = results;
          setorignalActorArr(results)
          total = results.length;
          if (total > 12) {

            actorArr = setResposneData(results, 0, 12)
          } else {
            actorArr = results
          }
          if (value === "a") {
            localStorage.setItem("actors", JSON.stringify(results))
          }
          setcardsArr(actorArr)
          setloader(false)
        }

      })
    });
  }

  window.onscroll = debounce(() => {


    if (window.innerHeight + document.documentElement.scrollHeight >= document.scrollingElement.offsetHeight) {
      // actorArr.concat(orignalActorArr.splice(actorArr.length, 12));
      //var next = orignalActorArr.splice(0 ,24)

      setcardsArr(cardsArr => cardsArr.concat(orignalActorArr.splice(actorArr.length, actorArr.length + 12)));
    }

  }, 100);



  useEffect(() => { getDataByFilter("a") }, []);



  return (

    <Router >



      <Switch>
        <Route exact path={`/reactpro`} >


          <div className="form-group has-success has-feedback" >
            <label className="col-sm-2 control-label" for="inputSuccess">Search</label>
            <div className="col-sm-12">
              <input type="text" className="form-control" id="inputSuccess" onChange={(e) => setValue(e.target.value)} />
              <span className="glyphicon glyphicon-ok form-control-feedback"></span>
            </div>

            {!loader ? cardsArr.map((data) => {

              return (
                <Link to={`/reactpro/${data["id"]}`} params={data}><Card style={{ width: '18rem', margin: "10px", display: "inline-block" }}>

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
                    <Button variant="primary" >More Details</Button>
                  </Card.Body>
                </Card>

                </Link>)
            }) : <div className="loader"></div>}


          </div>




        </Route>

        <Route path="/reactpro/:id" render={cardsArr.length > 0 ? (props) => <Details {...props} data={cardsArr} /> : ""} />


      </Switch>


    </Router>
  )






}