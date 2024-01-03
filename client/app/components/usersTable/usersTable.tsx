import styles from './usersTable.module.css';

export default function UsersTable(props: any) {

  const users = props.users; // Imported from parent component, contains the list of users to be displayed.
  const selectedUsers = props.selectedUsers; // Imported from parent component, contains a lists for IDs of selected users.
  const setSelecetedUsers = props.setSelecetedUsers;

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
      const updatedSelectedUsers = Object.assign([], selectedUsers);
      updatedSelectedUsers.push(e.target.value);
      setSelecetedUsers(updatedSelectedUsers);
    } else {
      // Remove user ID from selectedUsers list.
      if (selectedUsers.indexOf(e.target.value) > -1) {
        const updatedSelectedUsers = Object.assign([], selectedUsers);
        updatedSelectedUsers.splice(selectedUsers.indexOf(e.target.value), 1);
        setSelecetedUsers(updatedSelectedUsers);
      }
    }
  };

  return (
    <table className="table">
      {/* Table header. */}
      <thead>
        <tr>
          <th></th>
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
          <tr key={user.ID}>
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={user.ID} onChange={selectUser} id={user.ID} />
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
