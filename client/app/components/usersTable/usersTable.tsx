import styles from './usersTable.module.css';
import { useEffect } from 'react';

export default function UsersTable(props: any) {
  const users = props.users; // Imported from parent component, contains the list of users to be displayed.
  const selectedUsers = props.selectedUsers; // Imported from parent component, contains a lists for IDs of selected users.
  const setSelecetedUsers = props.setSelecetedUsers; // Imported from parent component, used to trigger a data fetch.

  useEffect(() => {
    console.log('UsersTable component mounted.');
    console.log(selectedUsers);
  }, [selectedUsers]);

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
      users.forEach((user: any) => {
        const ID = String(user.ID);
        if (updatedSelectedUsers.indexOf(ID) < 0) {
          updatedSelectedUsers.push(ID);
        }
      });
    } else {
      // Remove all user IDs from selectedUsers list.
      users.forEach((user: any) => {
        const ID = String(user.ID);
        if (updatedSelectedUsers.indexOf(ID) > -1) {
          updatedSelectedUsers.splice(updatedSelectedUsers.indexOf(ID), 1);
        }
      });
    }
    setSelecetedUsers(updatedSelectedUsers);
  };

  return (
    <table className="table">
      {/* Table header. */}
      <thead>
        <tr>
          <th>
            <div className="form-check">
              {
                // If all users are selected, render a checked checkbox.
                selectedUsers.length == users.length ? (
                  <input className="form-check-input" type="checkbox" onChange={selectAllUsers} id="selectAllUsers" value="selectAllUsers" checked />
                ) : (
                  // Else, render an unchecked checkbox.
                  <input className="form-check-input" type="checkbox" onChange={selectAllUsers} id="selectAllUsers" value="selectAllUsers" checked={false} />
                )
              }
            </div>
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
        {/* Map over users and display them in the table. */}
        {users.map((user: any) => (
          <tr key={'UserRow' + String(user.ID)}>
            <td>
              <div className="form-check">
                {
                  // If the user is selected, render a checked checkbox.
                  selectedUsers.indexOf(String(user.ID)) > -1 ? (
                    <input className="form-check-input" type="checkbox" onChange={selectUser} id={String(user.ID)} value={String(user.ID)} checked />
                  ) : (
                    // Else, render an unchecked checkbox.
                    <input className="form-check-input" type="checkbox" onChange={selectUser} id={String(user.ID)} value={String(user.ID)} checked={false} />
                  )
                }
              </div>
            </td>
            <td>
              {user.FirstName} {user.LastName}
            </td>
            <td>{user.Title}</td>
            <td>{user.Email}</td>
            <td>{user.Phone}</td>
            <td>{user.Address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
