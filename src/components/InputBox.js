import React, { Component } from 'react';

class InputBox extends Component {
  state = {
    search: "",
    location: ""
  }

  inputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value)
  }

  inputSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.search, this.state.location)
    this.props.listVenues(this.state.search, this.state.location)
  }

  render() {
    return (
      <div className="search-bar mt-5 p-3 p-lg-1 pl-lg-4">
        <form onSubmit={this.inputSubmit}>
          <div className="row">
            <div className="col-lg-4 d-flex align-items-center form-group">
              <input type="text"
                name="search"
                onChange={this.inputChange}
                placeholder="What activities would you like?"
                className="form-control border-0 shadow-0" />
            </div>
            <div className="col-lg-4 d-flex align-items-center form-group">
              <div className="input-label-absolute input-label-absolute-right w-100">
                <label htmlFor="location" className="label-absolute">
                  <i className="fa fa-crosshairs" />
                  <span className="sr-only">City</span>
                </label>
                <input type="text"
                  name="location"
                  onChange={this.inputChange}
                  placeholder="Location"
                  className="form-control border-0 shadow-0" />
              </div>
            </div>
            <div className="col-lg-4">
              <button className="btn btn-danger btn-block rounded-xl h-100">Search </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default InputBox;