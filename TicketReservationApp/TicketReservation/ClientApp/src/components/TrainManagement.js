import React, { useState } from 'react'
import { trains } from '../data/data';
import Table from '../shared/Table';

function TrainManagement() {

    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [data, setData] = useState(trains);

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
                  <h5 className="modal-title">New Train</h5>
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
                        Name:
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      onChange={e => setName(e.target.value)}
                      value={name}
                    />
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
      <h1 style={{ display: "inline" }}>Train Management</h1>

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
        Add New Train
      </button>
    </div>

    {renderModal()}

    <Table columns={columns} rows={data}  rowAccessor={rowAccessor}/>
    </main>
  )
}

export default TrainManagement

const columns = ["id", "name", "Date Created"];

const rowAccessor = ["id","name","dateCreated"]