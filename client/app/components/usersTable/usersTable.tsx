"use client";

import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import styles from "./usersTable.module.css";

export default function UsersTable() {
  const [selectedUsers, setSelecetedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<
    {
      ID: string;
      CreatedAt: Date;
      UpdatedAt: Date;
      DeletedAt: Date;
      FirstName: string;
      LastName: string;
      Email: string;
      Address: string;
      Phone: string;
      Position: string;
    }[]
  >([]);

  useEffect(() => {
    fetch("/api/get-users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    
  }, [selectedUsers])

  const selectUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const updatedSelectedUsers = Object.assign([], selectedUsers);
      updatedSelectedUsers.push(e.target.value);
      setSelecetedUsers(updatedSelectedUsers);
      console.log(updatedSelectedUsers)
      console.log("checked")
    } else {
      if(selectedUsers.indexOf(e.target.value) > -1) {
        const updatedSelectedUsers = Object.assign([], selectedUsers);
        updatedSelectedUsers.splice(selectedUsers.indexOf(e.target.value), 1);
        setSelecetedUsers(updatedSelectedUsers);
        console.log("unchecked")
      }
    }
  }

  return (
    <Container className="d-flex flex-column">
      <div className="mb-2">
        <button type="button" className={`${styles.tableButton} ${"btn btn-dark me-2"}`}>
          New <AddCircleIcon />
        </button>
        {
          selectedUsers.length == 1 ? (
            <button type="button" className={`${styles.tableButton} ${"btn btn-dark me-2"}`}>
              Edit <EditIcon />
            </button>
          ) : (
            <button type="button" className={`${styles.tableButton} ${"btn btn-dark me-2"}`} disabled>
              Edit <EditIcon />
            </button>
          )
        }
        {
          selectedUsers.length >= 1 ? (
            <button type="button" className={`${styles.tableButton} ${"btn btn-dark me-2"}`}>
            Delete <DeleteForeverIcon />
          </button>
          ) : (
            <button type="button" className={`${styles.tableButton} ${"btn btn-dark me-2"}`} disabled>
            Delete <DeleteForeverIcon />
          </button>
          )
        }
      </div>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Employee Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.ID}>
              <th>
                <div className="form-check">
                      <input
                    className="form-check-input"
                    type="checkbox"
                    value={user.ID}
                    onChange={selectUser}
                    id={user.ID}         
                  />
                </div>
              </th>
              <td>
                {user.FirstName} {user.LastName}
              </td>
              <td>{user.Position}</td>
              <td>{user.Email}</td>
              <td>{user.Phone}</td>
              <td>{user.Address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
