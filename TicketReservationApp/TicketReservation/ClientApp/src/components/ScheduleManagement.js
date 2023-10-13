import React, { useState } from 'react'
import { schedules, trains } from '../data/data';
import ReactDatePicker from 'react-datepicker';
import stations from '../constants/stations';

function ScheduleManagement() {

    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [data, setData] = useState(schedules);

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
      };

      const handleSubmit = () => {
        if(name === "") return alert("Name is required");
        const newTrain = {
            id: Math.floor(Math.random() * 300) + 1,
            name:name,
            dateCreated: new Date()
        };
        setData([...data , newTrain]);
        setShowModal(false);
      };

    const handleUpdate = d => {}
    const handleDelete = d => {}


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
                      aria-describedby="inputGroup-sizing-default">
                        <option value={""}>Select</option>
                        <option value={"train 1"}>Tran 1</option>
                        <option value={"train 2"}>Tran 2</option>
                        <option value={"train 3"}>Tran 3</option>
                        <option value={"train 4"}>Tran 4</option>
                    </select>
                  </div>

                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-default">
                        Date:
                      </span>
                    </div>
                   <ReactDatePicker className='form-control' />
                  </div>

                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-default">
                        Start Time:
                      </span>
                    </div>
                   <ReactDatePicker className='form-control' />
                  </div>

                  <div className="mb-3 d-flex align-items-center">
                 <label className="form-label me-2">Origin: </label>
                 <select name="origin" className="form-select" 
                //  value={destination} onChange={handleDestination} 
                 disabled={origin === ""} >
                 <option value={""}>Select</option>
                     {
                         stations.map((item) => <option value={item.name} id={item.name} key={item.name}>{item.name}</option>)
                     }
                 </select>

             </div>
                  <div className="mb-3 d-flex align-items-center">
                 <label className="form-label me-2">Destination: </label>
                 <select name="origin" className="form-select" 
                //  value={destination} onChange={handleDestination} 
                 disabled={origin === ""} >
                 <option value={""}>Select</option>
                     {
                         stations.map((item) => <option value={item.name} id={item.name} key={item.name}>{item.name}</option>)
                     }
                 </select>

             </div>
    
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

      <input
        style={{ marginLeft: 10, width: 500, padding: 10 }}
        onChange={handleSearch}
        type="search"
        placeholder="Search"
        aria-label="Search"
     />

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
                        <th>ID</th>
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
                            console.log('stops ',item.stops[0].station.name)
                            return(
                <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.train.name}</td>
                        <td>{item.date.toDateString()}</td>
                        <td>{item.startTime.toDateString()}</td>
                        <td>{item.origin}</td>
                        <td>{item.destination}</td>
                        <td>{item.stops.map((stop, index) => <p key={index}>{stop.station}</p>)}</td>

                        {/* <td>{item.timestamp.toDateString()}</td> */}
                        <td>
                        <button type="button" class="btn btn-warning btn-sm" onClick={() => handleUpdate(item)}>Update</button>
                        <button type="button" class="btn btn-danger btn-sm" style={{marginLeft:10}} onClick={() => handleDelete(item.id)} >Delete</button>
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