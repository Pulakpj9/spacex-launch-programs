import loader from './loader.gif';
import React, { Component } from 'react';
import './App.css';
import MissionDetails from './components/MissionDetails';


const API_BASE_URL = "https://api.spacexdata.com/v3/launches?limit=100";
const allfiltersapi = "https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=";
const launchAndLandFilterApi = "https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true";
const landApi = "https://api.spacexdata.com/v3/launches?limit=100&launch_success=true";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      filters: {
        limit: 100,
        launch_year: undefined,
        launch_success: undefined,
        land_success: undefined,
      },
    }

  }

  getUpdatedApiUrl(filters = {}) {
    if(filters.land_success === 'true' && filters.launch_success === 'true' && filters.launch_year){
      return allfiltersapi+filters.launch_year;
    }
    else if(filters.land_success === 'true' && filters.launch_success === 'true' ){
      return launchAndLandFilterApi
    }
    else if (filters.launch_success === 'true' ){
      return landApi;
    }
    else{
      return API_BASE_URL;
    }
  }

  fetchAPI(filters) {
    const URL = this.getUpdatedApiUrl(filters);
    this.setState({ isLoaded: false, filters });
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          data
        });
      });
  }

  componentDidMount() {
    this.fetchAPI(this.state.filters);
  }

  updateApiFilters(type, value) {
    
    if (this.state.filters[type] === value) {
      value = undefined;
    }

    const filters = {
      ...this.state.filters,
      [type]: value,
    };

    this.fetchAPI(filters);
  }

  render(){
    const { isLoaded, data } = this.state;
    const uniqueLaunchYears = new Array(16).fill(0).map((_, index) => 2006 + index);

    if (!isLoaded) {
      return <div className="App-loader-container">
        <div className="App-loader-box">
          <img src={loader} alt="loading..." />
        </div>
      </div>
    }

    else {
      return (
        <div className="container">
          <h1 className="header">SpaceX Launch Programs</h1>
          <div className='main-container'>
            <aside className="filter-container">
              <p><h5 className='filter-heading'>Filters</h5></p>
              <div className='filter' id='filter-1'>
                <div className='filter-title'>
                  <p>Launch Year</p>
                  <hr/>
                </div>
                <div className='filter-year-buttons'>
                {uniqueLaunchYears.map((year) => {
                          return (
                            <button
                              className="button"
                              variant={
                                this.state.filters.launch_year ===
                                year.toString()
                                  ? "success"
                                  : "outline-success"
                              }
                              id={year}
                              value={year}
                              onClick={(e) =>
                                this.updateApiFilters(
                                  "launch_year",
                                  e.target.value
                                )
                              }
                            >
                              {year}
                            </button>
                          );
                        })}
                </div>
              </div>
              <div className='filter' id='filter-2'>
                <div className='filter-title'>
                  <p>Successful Launch</p>
                  <hr/>
                </div>
                <div className='filter-boolean-buttons'>
                  <button className="button"
                      variant={
                        this.state.filters.launch_success === "true"
                          ? "success"
                          : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="true"
                      >
                        True
                      </button>

                      <button
                        className="button"
                        variant={
                          this.state.filters.launch_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="false"
                      >
                        False
                      </button>
                </div>
              </div>
              <div className='filter' id='filter-3'>
                <div className='filter-title'>
                  <p>Successful Landing</p>
                  <hr/>
                </div>
                <div className='filter-boolean-buttons'>
                <button
                        className="button"
                        variant={
                          this.state.filters.land_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters("land_success", e.target.value)
                        }
                        value="true"
                      >
                        True
                      </button>

                      <button
                        className="button"
                        variant={
                          this.state.filters.land_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters("land_success", e.target.value)
                        }
                        value="false"
                      >
                        False
                      </button>
                </div>
              </div>
            </aside>
            <div className='content-container'>
                {data.map((details) => {
                  return (
                    <div className='content-container-item'>
                       <MissionDetails details={details} />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="App-Developers-name">
              <h5>Developed by : </h5>&nbsp;<div className='developer-name'>Pulak Jain</div> 
            </div>
        </div>
      );
    }
  }

}

export default App;
