import styles from './usersTable.module.css';
import { useEffect } from 'react';

export default function UsersTable(props: any) {
  const foundUsers = props.foundUsers; // Imported from parent component, contains a list of users that match the search query.
  const selectedUsers = props.selectedUsers; // Imported from parent component, contains a lists for IDs of selected users.
  const setSelecetedUsers = props.setSelecetedUsers; // Imported from parent component, used to trigger a data fetch.

  useEffect(() => {}, [selectedUsers]);

  /*
  Function Description:
  Handler function for the checkbox input.
  Adds or removes a user ID to/from the selectedUsers list on checkbox change.

  Param:
  e: React.ChangeEvent<HTMLInputElement>
   */
  const selectUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // Add user ID to selectedUsers list.
      if (selectedUsers.indexOf(e.target.value) < 0) {
        const updatedSelectedUsers = Object.assign([], selectedUsers);
        updatedSelectedUsers.push(e.target.value);
        setSelecetedUsers(updatedSelectedUsers);
      }
    } else {
      // Remove user ID from selectedUsers list.
      if (selectedUsers.indexOf(e.target.value) > -1) {
        const updatedSelectedUsers = Object.assign([], selectedUsers);
        updatedSelectedUsers.splice(selectedUsers.indexOf(e.target.value), 1);
        setSelecetedUsers(updatedSelectedUsers);
      }
    }
  };

  /*
  Function Description:
  Handler function for the checkbox input.
  Adds or removes all user IDs to/from the selectedUsers list on checkbox change.
  
  Param:
  e: React.ChangeEvent<HTMLInputElement>
   */
  const selectAllUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSelectedUsers = Object.assign([], selectedUsers);
    if (e.target.checked) {
      // Add all user IDs to selectedUsers list.
      foundUsers.forEach((user: any) => {
        const ID = String(user.ID);
        if (updatedSelectedUsers.indexOf(ID) < 0) {
          updatedSelectedUsers.push(ID);
        }
      });
    } else {
      // Remove all user IDs from selectedUsers list.
      foundUsers.forEach((user: any) => {
        const ID = String(user.ID);
        if (updatedSelectedUsers.indexOf(ID) > -1) {
          updatedSelectedUsers.splice(updatedSelectedUsers.indexOf(ID), 1);
        }
      });
    }
    setSelecetedUsers(updatedSelectedUsers);
  };

  return (
    <>
      <div className={styles.tableContainer}>
        {foundUsers.length > 0 ? (
          <table className="table table-striped table-borderless">
            {/* Table header. */}
            <thead>
              <tr>
                <th>
                  {
                    // If all users are selected, render a checked checkbox.
                    selectedUsers.length == foundUsers.length ? (
                      foundUsers.length > 0 ? (
                        <input className="ms-3 mt-1" name="checkbox-checked" type="checkbox" onChange={selectAllUsers} id="selectAllUsers" value="selectAllUsers" checked />
                      ) : (
                        // Else, render an unchecked checkbox.
                        <input className="ms-3 mt-1" name="checkbox-disabled" type="checkbox" onChange={selectAllUsers} id="selectAllUsers" value="selectAllUsers" checked={false} disabled />
                      )
                    ) : (
                      // Else, render an unchecked checkbox.
                      <input className="ms-3 mt-1" name="checkbox" type="checkbox" onChange={selectAllUsers} id="selectAllUsers" value="selectAllUsers" checked={false} />
                    )
                  }
                </th>
                <th>Employee Name</th>
                <th>Title</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
              </tr>
            </thead>
            {/* Table body. */}
            <tbody>
              {
                /* Map over users and display them in the table. */
                foundUsers.map((user: any) => (
                  <tr key={'UserRow' + String(user.ID)}>
                    <td>
                      {
                        // If the user is selected, render a checked checkbox.
                        selectedUsers.indexOf(String(user.ID)) > -1 ? (
                          <input className="ms-3 mt-1" name="checkbox-checked" type="checkbox" onChange={selectUser} id={String(user.ID)} value={String(user.ID)} checked />
                        ) : (
                          // Else, render an unchecked checkbox.
                          <input className="ms-3 mt-1" name="checkbox" type="checkbox" onChange={selectUser} id={String(user.ID)} value={String(user.ID)} checked={false} />
                        )
                      }
                    </td>
                    <td>
                      {user.FirstName} {user.LastName}
                    </td>
                    <td>{user.Title}</td>
                    <td>{user.Email}</td>
                    <td>{user.Phone}</td>
                    <td>{user.Address}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ) : (
          // Else, render a message.
          <div className="w-100 h-100 d-flex">
            <p className={`${styles.tableText} ${'mx-auto my-auto fs-1 text-wrap'}`}>No users found.</p>
          </div>
        )}
      </div>
    </>
  );
}
