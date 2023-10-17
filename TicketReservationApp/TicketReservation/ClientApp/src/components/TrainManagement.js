import React, { useEffect, useState } from 'react'
import { trains } from '../data/data';
import Table from '../shared/Table';
import apiCall from '../utils/apiCall';

function TrainManagement() {

    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [data, setData] = useState("");
    const [initialData, setInitData]=useState([]);


    //
const loadTrains = async () => {
        try {
            const response = await apiCall('get', "api/trains");
            if(response){
                console.log("loaded:::::",response)
                setData(response)
                setInitData(response)
            }else{
                // setData([])
            }
        } catch (error) {
            console.log('error ',error)
        }
    }
      //

    useEffect(() => {
        loadTrains();
    },[])

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
            setData(initialData);
        }
      };
    
      const handleModalClose = () => {
        setShowModal(false);
      };

      const handleSubmit = () => {
        if(name === "") return alert("Name is required");
        const newTrain = {
            _id: "",
            name:name
        };
        setData([...data,newTrain]);
        submitTrain(newTrain);
        setShowModal(false);
      };


      //
const submitTrain = async (newTrain) => {
        try {
            const response = await apiCall('post', "api/trains", newTrain);
            if(response){
                console.log("added:::::")
                // setData();
            }else{
                // setData([])
            }
        } catch (error) {
            console.log('error ',error)
        }
    }
      //

            //



      const handleDelete=async (id)=>{
        try {
            await apiCall('delete', "api/trains/"+id);
      
                console.log("deleted:::::")
                loadTrains();
            
        } catch (error) {
            console.log('error ',error)
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
      <h1 style={{ display: "block" }}>Train Management</h1>

      <input
        style={{width: 500, padding: 10 }}
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

    <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
        
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.length &&
                        data?.map(item => {
                            console.log('table row data ',item)
                            return(
                <tr key={item._id}>
                       
                        <td>{item.name}</td>
                        
                        <td style={{width:"20%"}}>
                        <button type="button" class="btn btn-danger btn-sm" style={{marginLeft:10}} onClick={() => handleDelete(item._id)} >Delete</button>
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

export default TrainManagement

const columns = ["id", "name", "Date Created"];

const rowAccessor = ["id","name","dateCreated"]