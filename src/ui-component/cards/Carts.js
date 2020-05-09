import React, { useState, useEffect } from 'react';
import './card.css'
import Details from './details'
import ActorsCard from './card'
import {
  BrowserRouter as Router,
  Switch,
  Route

} from "react-router-dom";

export default function Carts() {

  const [orignalActorArr, setorignalActorArr] = useState([])
  const [val, setVal] = useState(null)
  const [loader, setloader] = useState(false)
  const [cardsArr, setcardsArr] = useState([])
  let results = []
  let actorArr = [];
  let total;

  const setResposneData = (data, start, end) => {
    return data.splice(start, end);
  }


  const debounce = (func, delay) => {
    let debounceTimer
    return function () {
      const context = this
      const args = arguments
      clearTimeout(debounceTimer)
      debounceTimer
        = setTimeout(() => func.apply(context, args), delay)
    }
  }

  useEffect(() => {
    var inputField = document.getElementById("inputSuccessSeacrch");
    if(inputField){
      inputField.addEventListener('keydown', debounce(function (e) {
        if (e && e.target && e.target.value) {
          getDataByFilter(e.target.value)
        } else {
          getDataByFilter("a")
        }


      }, 500)) 
    }
  }, [val]);




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
      setcardsArr(cardsArr => cardsArr.concat(orignalActorArr.splice(actorArr.length, actorArr.length + 12)));
    }
  }, 100);



  useEffect(() => { getDataByFilter("a") }, []);



  return (

    <Router >
      <Switch>
        <Route exact path={`/reactpro`} >
          <div className="form-group has-success has-feedback" >

            <div className="col-sm-12 ">
              <input type="text" placeholder="search" className="form-control" id="inputSuccessSeacrch" onChange={(e)=>setVal(e.target.value)}/>
              <span className="glyphicon glyphicon-ok form-control-feedback"></span>
            </div>
            {!loader ? cardsArr.map((data) => {
              return (
                <ActorsCard data={data} />)
            }) : <div className="loader"></div>}
          </div>
        </Route>
        <Route exact path="/reactpro/:id" render={cardsArr.length > 0 ? (props) => <Details {...props} data={cardsArr} /> : ""} />
      </Switch>
    </Router>
  )






}