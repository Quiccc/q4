import styles from './deleteUser.module.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function DeleteUser(props: any) {

  const selectedUsers = props.selectedUsers;
  const setSelecetedUsers = props.setSelecetedUsers;
  const setFetchFlag = props.setFetchFlag;

  function deleteUsers() {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'Delete User Request.',
    };

    const path = '/api/delete-users?ids=' + toPathString(selectedUsers);
    fetch(path, options).then((response) => {
      if (response.status == 200) {
        setSelecetedUsers([]);
        setFetchFlag(true);
        console.log('User deleted!');
      } else {
        console.log(response.status);
      }
    });
  }

  return (
    <button type="button" className={`${styles.deleteButton} ${'btn btn-dark me-2'}`} onClick={deleteUsers}>
      Delete <DeleteForeverIcon />
    </button>
  );
}

function toPathString(ids: number[]) {
  let pathString = '';
  for (let i = 0; i < ids.length; i++) {
    pathString += ids[i] + '+';
  }
  return pathString;
}
