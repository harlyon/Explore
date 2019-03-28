import React from 'react';

const List = ({myVenue}) => {
    return (
      <div>
              <div key={myVenue.id}
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
      </div>
    );
}

export default List;