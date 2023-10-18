import React, { useEffect, useState } from 'react'
import { schedules, trains } from '../data/data';
import ReactDatePicker from 'react-datepicker';
import stations from '../constants/stations';
import apiCall from '../utils/apiCall';

function ScheduleManagement() {

    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);
    const [stops, setStops] = useState([]);
    const [location , setLocation ] = useState("");
    const [origin, setOrigin ] = useState("");
    const [ destination, setDestination] = useState("");
    const [time ,setTime ] = useState(new Date());
    const [startTime  , setStartTime] = useState(new Date());
    const [train , setTrain] = useState(null);
    const [date , setDate ] = useState(new Date());
    const [trains , setTrains] = useState([]);

    const toggleModal = () => {
        setShowModal(!showModal);
      };
    
      const handleSearch = (e) => {
        if(e.target.value){
            const filteredData = data.filter((item) =>
            item.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setData(filteredData);
        }else{
            setData(trains);
        }
      };
    
      const handleModalClose = () => {
        setShowModal(false);
        setOrigin("");
        setDestination("");
        setStops([]);
      };

      const handleSubmit = async () => {
        
        if(!train) return alert("Train is required");
        if(!startTime) return alert("Start time is required");
        if(origin === "") return alert("Origin is required")
        if(destination === "") return alert("Destination is required")
        if(stops.length < 2) return alert("Add atleast 2 stops");
        const body = {
          origin,
          destination,
          date,
          startTime,
          stops,
          train: {
            id: train._id,
            ...train
          },
          timestamp: new Date()
        };

        try {
          await apiCall('post', "api/trainschedule", body);
          handleModalClose();
          loadSchedules()
        } catch (error) {
          console.log('add schdle erro ',error)
        }

      };

    const handleUpdate = d => {}

    const handleAddLocation = () => {
      if(location === "")return alert("Select location");
      if(!time) return alert("Enter time");
      const newLocations = [...stops];
      newLocations.push({
        station: location,
        time
      });
      setStops(newLocations);
    }

    const loadSchedules = async () => {
      try {
        const response = await apiCall('get','api/trainschedule');
        if(response){
          setData(response)
        }else{
          setData([])
        }
      } catch (error) {
        console.log('error ',error);
      }
    };

    useEffect(() => {
      loadSchedules();
    },[])

    const StopInput = () =>{

      return(
        <div>
          {
            stops?.length > 0 ? 
            stops.map((stp,i) => <div key={i}>
              <p>{stp.station}</p>
              <p>{new Date(stp.time).toLocaleTimeString()}</p>
              </div>
              )
              : null
          }
        <div>

              <label className="form-label me-2">Stops: </label>
              <select name="stops" className="form-select" 
                 value={location}  
                onChange={e => setLocation(e.target.value)}
                disabled={origin === ""} >
                 <option value={""}>Select</option>
                     {
                       stations.map((item) => <option value={item.name} id={item.name} key={item.name}>{item.name}</option>)
                      }
                 </select>
                      </div>
                      <br></br>

                 <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-default">
                        Time:
                      </span>

                    </div>
        <ReactDatePicker className='form-control'
         showTimeSelect
         showTimeSelectOnly 
         selected={time}
          onChange={e=> setTime(e)} 
          dateFormat="h:mm aa"
          />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddLocation}
                  >
                    Add
                  </button>


                 
             </div>)
    }

    

    useEffect(() => {
      const loadTrains = async () => {
      try {
        const response = await apiCall('get', 'api/trains');
        console.log('trains ',response)
        if(response){
          setTrains(response);
        }else{
          setTrains([]);
        }
      } catch (error) {
        console.log('load trains err ',error);
      }
    }
      loadTrains();
    },[])

    const handleTrainSelect = e => {
      if(e.target.selectedIndex >0){
        setTrain(trains[e.target.selectedIndex -1])
      }
    }

    const handleDeleteSchedule = async (id) => {
      try {
        await apiCall('delete', 'api/trainschedule/'+id)
        loadSchedules();
      } catch (error) {
        console.log('delete error ',error);
      }
    }


    const renderModal = () => {
        return (
          <div
            className={`modal ${showModal ? "show" : ""}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: showModal ? "block" : "none" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">New Schedule</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={toggleModal}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-default">
                        Train:
                      </span>
                    </div>
                    <select class="form-control"
                      aria-label="Default"
                      onChange={handleTrainSelect}
                      aria-describedby="inputGroup-sizing-default">
                        <option value={""}>Select</option>
                        {
                          trains?.map(tr => <option key={tr?._id} value={tr} >{tr?.name}</option>)
                        }
                    </select>
                  </div>

                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-default">
                        Date:
                      </span>
                    </div>
                   <ReactDatePicker className='form-control' selected={date} onChange={e => setDate(e)} />
                  </div>

                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-default">
                        Start Time:
                      </span>
                    </div>
                   <ReactDatePicker className='form-control' dateFormat="h:mm aa" showTimeSelect showTimeSelectOnly selected={startTime} onChange={e => setStartTime(e)} />
                  </div>

                  <div className="mb-3 d-flex align-items-center">
                 <label className="form-label me-2">Origin: </label>
                 <select name="origin" className="form-select" 
                 value={origin} onChange={e => setOrigin(e.target.value)} 
                 >
                 <option value={""}>Select</option>
                     {
                         stations.map((item) => <option value={item.name} id={item.name} key={item.name}>{item.name}</option>)
                     }
                 </select>

             </div>
                  <div className="mb-3 d-flex align-items-center">
                 <label className="form-label me-2">Destination: </label>
                 <select name="destination" className="form-select" 
                 value={destination} onChange={e => setDestination(e.target.value)} 
                 disabled={origin === ""} 
                 >
                 <option value={""}>Select</option>
                     {
                         stations.map((item) => <option value={item.name} id={item.name} key={item.name}>{item.name}</option>)
                     }
                 </select>

             </div>

                     <StopInput />
    
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleModalClose}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      };

  return (
    <main className="container mt-5">
    <div
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}
    >
      <h1 style={{ display: "inline" }}>Schedule Management</h1>

      {/* <input
        style={{ marginLeft: 10, width: 500, padding: 10 }}
        onChange={handleSearch}
        type="search"
        placeholder="Search"
        aria-label="Search"
     /> */}

      <button
        type="button"
        className="btn btn-primary"
        onClick={toggleModal}
        style={{ float: "right" }}
      >
        Add New Schedule
      </button>
    </div>

    {renderModal()}

    <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Train</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Stops</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(item => {
                            return(
                <tr key={item.id}>
                        <td>{item.train.name}</td>
                        <td>{new Date(item.date).toDateString()}</td>
                        <td>{new Date(item.startTime).toLocaleTimeString()}</td>
                        <td>{item.origin}</td>
                        <td>{item.destination}</td>
                        <td>{item.stops.map((stop, index) => <p key={index}>{stop.station}</p>)}</td>

                        {/* <td>{item.timestamp.toDateString()}</td> */}
                        <td>
                        {/* <button type="button" class="btn btn-warning btn-sm" onClick={() => handleUpdate(item)}>Update</button> */}
                        <button type="button" class="btn btn-danger btn-sm" style={{marginLeft:10}} onClick={() => handleDeleteSchedule(item.id)} >Delete</button>
                        </td>
                    </tr>

                            )
                        })
                    }
                </tbody>
            </table>
    </main>
  )
}

export default ScheduleManagement

const columns = ["ID", "Train", "Date", "Time" ,"Origin" ,"Destination", "Stops"];

const rowAccessor = ["id","train.name","date","startTime", "origin","destination","stops"]