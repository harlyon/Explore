import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import InputBox from './components/InputBox';
import List from './components/List';

class App extends Component {
  state = {
    venues: []
  }

  renderMap = () => {
    Script(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA&callback=initMap`
    );
    window.initMap = this.initMap;
  };

  listVenues = (query, location) => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR",
      client_secret: "CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0",
      query: query,
      near: location,
      v: "20182507"
    };
    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState(
          {
            //After getting the response render the Map
            venues: response.data.response.groups[0].items
          },
          this.renderMap()
        );
      })
      .catch(error => {
        console.log("ERROR!! " + error);
      });
  };

  initMap = () => {
    // Create A Map
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 0, lng: 180 },
      zoom: 2
    });
    //Info Window
    var infowindow = new window.google.maps.InfoWindow();

    //Loop through map venues and display content requested
    this.state.venues.map(myVenue => {
      var contentString = `${myVenue.venue.name}`;
      var contentAddress = `${myVenue.venue.location.address}`;
      var contentPhoto = `${myVenue.venue.photos[0]}`;
      console.log(myVenue)

      //Create a Marker
      // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
      var marker = new window.google.maps.Marker({
        position: {
          lat: myVenue.venue.location.lat,
          lng: myVenue.venue.location.lng,
          animation: window.google.maps.Animation.DROP
        },
        map: map,
        //icon: image,
        title: myVenue.venue.name,
      });
      //On Click Open info Window
      marker.addListener("click", function() {
        //Change content
        infowindow.setContent(contentString + " " + contentAddress);
        infowindow.open(map, marker);
      });
    });
  };


  render() {
    console.log(this.state.venues)
    const bg = 'https://d19m59y37dris4.cloudfront.net/directory/1-1/img/photo/photo-1534850336045-c6c6d287f89e.jpg'
    return (
      <div>
        {this.state.venues.length === 0 ? (
          <section className="hero-home dark-overlay"
            style={{
              backgroundImage: 'url("' + bg + '")',
              backgroundSize: "cover",
              height: "100vh"
            }}>
            <div className="container py-6 py-md-7 text-white z-index-20" style={{ marginBottom: "100px" }}>
              <div className="row">
                <div className="col-xl-10">
                  <div className="text-center text-lg-left">
                    <p className="subtitle letter-spacing-4 mb-2 text-secondary text-shadow">The best holiday experience</p>
                    <h1 className="display-3 font-weight-bold text-shadow">Explore Activities</h1>
                  </div>
                  <InputBox listVenues={this.listVenues} />
                </div>
              </div>
            </div>
          </section>
        ) : (
            <>
              <div className="col-lg-12" >
                <br />
               <div id="map" className="map-full" style={{ height: "500px"}} />
              </div>
              <br />
          <div className="container">
                <div className="row">
                <div className="col-xl-10 text-center">
                    <InputBox listVenues={this.listVenues} />
                    <br /><br /><br />
                </div>
                {
                  this.state.venues.map((myVenue, index) => {
                    return (
                      <div key={index}
                        className="col-md-4"
                        style={{ marginBottom: "2rem" }}>
                        <div className="news__box">
                          <div className="news__text">
                        <h5 className="news__title">
                          {myVenue.venue.name}
                        </h5>
                            <p className="news__subtitle">
                              <span>{myVenue.venue.location.address} {myVenue.venue.location.city}</span>
                            </p>
                            <p className="news__subtitle">
                              <span>{myVenue.venue.location.state}</span>
                            </p>
                      </div>
                        </div>
                      </div>
                    )
                  })
                }
            </div>
              </div>
              </>
          )}
        </div>
    );
  }
}

function Script(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
