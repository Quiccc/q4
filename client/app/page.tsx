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

export default function Home() {
  const [selectedUsers, setSelecetedUsers] = useState<string[]>([]);
  const [fetchFlag, setFetchFlag] = useState<boolean>(true);
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
    if (fetchFlag) {
      console.log('FETCHING');
      fetch('/api/get-users')
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          }
          if (res.status == 404) {
            return [];
          }
          // TODO: Handle 500
        })
        .then((data) => setUsers(data))
      setFetchFlag(false);
    }
  }, [fetchFlag]);

  return (
    <div data-bs-theme="dark">
      <Header />
      <Container>
        <div className="d-inline-flex mb-2">
          <CreateUserModal setFetchFlag={setFetchFlag} />
          {selectedUsers.length == 1 ? (
            <EditUserModal setFetchFlag={setFetchFlag} editedUser={users.find((user) => user.ID == selectedUsers[0])} />
          ) : (
            <button type="button" className={`${styles.tableButton} ${'btn btn-dark me-2'}`} disabled>
              Edit <EditIcon />
            </button>
          )}
          {selectedUsers.length >= 1 ? (
            <DeleteUser selectedUsers={selectedUsers} setSelecetedUsers={setSelecetedUsers} setFetchFlag={setFetchFlag} />
          ) : (
            <button type="button" className={`${styles.tableButton} ${'btn btn-dark me-2'}`} disabled>
              Delete <DeleteForeverIcon />
            </button>
          )}
        </div>
        {
          users.length > 0 ? <UsersTable users={users} selectedUsers={selectedUsers} setSelecetedUsers={setSelecetedUsers} /> : null //TODO: Style this
        }
      </Container>
    </div>
  );
}
