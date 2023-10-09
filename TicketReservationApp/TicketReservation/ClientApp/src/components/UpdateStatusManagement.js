import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit} from "@fortawesome/free-solid-svg-icons";

export default function UpdateStatusManagement() {
  const [travellers, setTravellers] = useState([]);


  useEffect(() => {
    fetch("api/traveller")
      .then((r) => r.json())
      .then((d) => {
        console.log("The travellers are ", d);
        setTravellers(d);
      })
      .catch((e) => console.log("The error fetching all travellers", e));
  }, []);

  return (
    <main className="container mt-5">
      <h1>Train Ticket Reservation Management</h1>

      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>NIC</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {travellers.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                Loading...
              </td>
            </tr>
          ) : (
            travellers.map((traveller) => (
              <tr key={traveller.id}>
                <td>{traveller.nic}</td>
                <td>{traveller.firstName}</td>
                <td>{traveller.lastName}</td>
                <td
                  style={{
                    backgroundColor:
                      traveller.status === false ? "red" : "white",
                  }}
                >
                  {traveller.status ? "Active" : "Inactive"}
                </td>
                <td>
                  <a href={"/update-traveller-status?id=" + traveller.id}>
                    <button className="btn btn-warning mx-1">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    
    </main>
  );
}
