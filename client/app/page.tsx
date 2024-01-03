'use client';

import UsersTable from './components/usersTable/usersTable';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import CreateUserModal from './components/createUserModal/createUserModal';
import EditUserModal from './components/editUserModal/editUserModal';
import DeleteUser from './components/deleteUser/deleteUser';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Container } from 'react-bootstrap';

// Home page component. Rest of the components are imported and rendered here.
export default function Home() {
  const [selectedUsers, setSelecetedUsers] = useState<string[]>([]); // Contains a list of IDs of selected users. These IDs are used to perform CRUD operations.
  const [fetchFlag, setFetchFlag] = useState<boolean>(true); // Used to trigger a data fetch while true.
  
  // Model object for a user.
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
      Title: string;
    }[]
  >([]);

  // Fetch users on page load and state change.
  useEffect(() => {
    if (fetchFlag) {
      const fetchUsers = async () => {
        const res = await fetch('/api/get-users');
        const data = await res.json();

        console.log(res.status + ": Fetch successful.");
        setUsers(data);
        setFetchFlag(false); // Set to false to prevent infinite loop.
      }

      fetchUsers()
      .catch(() => {
        console.log("No users found.");
        setUsers([]); 
        setFetchFlag(false); // Set to false to prevent infinite loop.
      })
    }
  }, [fetchFlag]);

  return (
    <div data-bs-theme="dark">
      {/* Header component. */}
      <Header /> 
      <Container>
        {/* Create, Edit and Delete buttons. */}
        <div className="d-inline-flex mb-2">
          {/* createUserModal component button */}
          <CreateUserModal setFetchFlag={setFetchFlag} />
          {
            // If only one user is selected, render editUserModal component button.
          selectedUsers.length == 1 ? (
            <EditUserModal setFetchFlag={setFetchFlag} editedUser={users.find((user) => user.ID == selectedUsers[0])} />
          ) : (
            // Else, render a disabled button.
            <button type="button" className={`${styles.tableButton} ${'btn btn-dark me-2'}`} disabled>
              Edit <EditIcon />
            </button>
          )}
          {selectedUsers.length >= 1 ? (
            // If at least one user is selected, render deleteUser component button.
            <DeleteUser selectedUsers={selectedUsers} setSelecetedUsers={setSelecetedUsers} setFetchFlag={setFetchFlag} />
          ) : (
            // Else, render a disabled button.
            <button type="button" className={`${styles.tableButton} ${'btn btn-dark me-2'}`} disabled>
              Delete <DeleteForeverIcon />
            </button>
          )}
        </div>      
        {
          // Render the users table if users.length > 0.
          users.length > 0 ? <UsersTable users={users} selectedUsers={selectedUsers} setSelecetedUsers={setSelecetedUsers} /> : null //TODO: Style this
        }
      </Container>
    </div>
  );
}
