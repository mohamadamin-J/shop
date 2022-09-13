import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
function App() {
  const [posts, setPosts] = useState([]);
  const [searchUnit, setSearchUnit] = useState("");
  const [selecetedUnit, setSelecetedUnit] = useState({ title: "", images: [] });
  const [searchUnitInfo, setSearchUnitInfo] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((json) => {
        setPosts(json.products);
      });
  }, []);
  useEffect(() => {
    fetch(`https://dummyjson.com/products/search?q=${searchUnit}`)
      .then((response) => response.json())
      .then((json) => {
        if (searchUnit) {
          setSearchUnitInfo(json);
          setIsSearched(true);
        } else {
          setSearchUnitInfo(null);
          setIsSearched(false);
        }
      });
  }, [searchUnit]);

  const changeSearch = (event) => {
    const myPromise = new Promise(function (myResolve, myReject) {
      setTimeout(() => {
        myResolve(true);
      }, 1000);
    });

    myPromise.then(function (value) {
      if (value) {
        setSearchUnit(event.target.value);
        setIsTyping(false);
        console.log(searchUnit);
      }
    });
  };

  return (
    <div className="App container-sm ">
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={"bottom"}
        scroll={true}
        backdrop={true}
        style={{ height: "50vh" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{selecetedUnit.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div class="container text-center">
            <div class="row g-2">
              {selecetedUnit.images.map((image) => {
                return (
                  <div class="col-6">
                    <img
                      src={image}
                      alt="..."
                      style={{ height: "300px", width: "300px" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <input
        type="text"
        class="form-control mb-3"
        placeholder="enter product"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        onChange={changeSearch}
      />

      <div class="row-cols-4  g-4 row">
        {isSearched
          ? searchUnitInfo.products.map((element) => {
              return (
                <div
                  class="col-3 "
                  onClick={() => {
                    setSelecetedUnit(element);

                    setShow(true);
                    console.log(element);
                  }}
                >
                  <div class=" card text-dark ">
                    <img
                      src={element.images[0]}
                      class="card-img opacity-50"
                      alt="..."
                      style={{ height: "300px" }}
                    />
                    <div class="card-img-overlay">
                      <h5 class="card-title">{element.title}</h5>
                      <p class="card-text">{element.description}</p>
                      <p class="card-text">
                        <small>{element.price}$</small>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          : posts.map((element) => {
              return (
                <div
                  class="col-3 "
                  onClick={() => {
                    setSelecetedUnit(element);
setShow(true);
                  }}
                >
                  <div class=" card text-dark ">
                    <img
                      src={element.images[0]}
                      class="card-img opacity-50"
                      alt="..."
                      style={{ height: "300px" }}
                    />
                    <div class="card-img-overlay">
                      <h5 class="card-title">{element.title}</h5>
                      <p class="card-text">{element.description}</p>
                      <p class="card-text">
                        <small>{element.price}$</small>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
export default App;