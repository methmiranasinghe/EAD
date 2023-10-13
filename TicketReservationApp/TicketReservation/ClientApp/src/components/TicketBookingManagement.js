import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { trains, travellers } from "../data/data";
import { useNavigate } from "react-router-dom";
import Table from "../shared/Table";

function TicketBookingManagement(props) {

    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [nic, setNic] = useState("");
    const [address, setAddress] = useState("");
    const [contact , setContact] = useState("");

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(travellers);
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSearch = (e) => {
    const filteredData = travellers.filter((item) =>
      item.firstName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setData(filteredData);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleRowClick = (user) => {
    // alert(user.id);
    navigate("/ticket-booking", {
      state: {
        id: user.id,
      },
    });
  };

  const handleSubmit = () => {
    if(firstName === "") return alert("First Name is required!");
    if(lastName === "") return alert("Last Name is required!");
    if(nic === "") return alert("NIC is required!");
    if(address === "") return alert("Address is required!");
    if(contact === "") return alert("Contact is required!");
    setShowModal(false);
    alert("Submitted");

    // extra part temprry
    const newData = [...data];
    const newUser = {
        firstName,lastName,address,nic,contact, id: Math.floor(Math.random() * 2000) + 1
    };
    newData.push(newUser);
    setData(newData);
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
              <h5 className="modal-title">New Booking</h5>
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
                    First Name:
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={e => setFirstName(e.target.value)}
                  value={firstName}
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Last Name:
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={e => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    NIC:
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={e => setNic(e.target.value)}
                  value={nic}
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Address:
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={e => setAddress(e.target.value)}
                  value={address}
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Contact:
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={e => setContact(e.target.value)}
                  value={contact}
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
        <h1 style={{ display: "inline" }}>Traveller Management</h1>

        {/* <input placeholder="Search" style={{borderWidth:1 , padding: 10 , marginLeft: 10}} /> */}
        <input
          style={{ marginLeft: 10, width: 500, padding: 10 }}
          onChange={handleSearch}
          type="search"
          placeholder="Search"
          aria-label="Search"
        ></input>

        <button
          type="button"
          className="btn btn-primary"
          onClick={toggleModal}
          style={{ float: "right" }}
        >
          Add New Traveller
        </button>
      </div>

      {renderModal()}

     <Table columns={columns} rows={data} rowAccessor={rowAccessor} onClick={handleRowClick} />
    </main>
  );
}

export default TicketBookingManagement;

const columns = ["id", "First Name", "Last Name","NIC" ,"Address","Contact"];


const rowAccessor = ["id","firstName","lastName",  "nic","address","contact"]
