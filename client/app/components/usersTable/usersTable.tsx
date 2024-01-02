import styles from './usersTable.module.css';

export default function UsersTable(props: any) {

  const users = props.users;
  const selectedUsers = props.selectedUsers;
  const setSelecetedUsers = props.setSelecetedUsers;

  const selectUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const updatedSelectedUsers = Object.assign([], selectedUsers);
      updatedSelectedUsers.push(e.target.value);
      setSelecetedUsers(updatedSelectedUsers);
    } else {
      if (selectedUsers.indexOf(e.target.value) > -1) {
        const updatedSelectedUsers = Object.assign([], selectedUsers);
        updatedSelectedUsers.splice(selectedUsers.indexOf(e.target.value), 1);
        setSelecetedUsers(updatedSelectedUsers);
      }
    }
  };

  return (
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
        {users.map((user: any) => (
          <tr key={user.ID}>
            <th>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={user.ID} onChange={selectUser} id={user.ID} />
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
  );
}
