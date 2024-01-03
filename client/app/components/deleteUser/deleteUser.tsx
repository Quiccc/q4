import styles from './deleteUser.module.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function DeleteUser(props: any) {
  const selectedUsers = props.selectedUsers;
  const setSelecetedUsers = props.setSelecetedUsers;
  const setFetchFlag = props.setFetchFlag;

  async function deleteUsers() {
    const options = {
      method: 'DELETE',
    };

    const path = '/api/delete-users?ids=' + toPathString(selectedUsers);
    const response = await fetch(path, options);

    if (response.status == 200) {
      setSelecetedUsers([]);
      setFetchFlag(true);
      console.log(response.status + ': User deletion successful.');
    }
  }

  return (
    <button type="button" className={`${styles.deleteButton} ${'btn btn-dark me-2'}`} onClick={() => deleteUsers().catch((err) => console.log(err))}>
      Delete <DeleteForeverIcon />
    </button>
  );
}

function toPathString(ids: number[]) {
  let pathString = '';
  for (let i = 0; i < ids.length; i++) {
    pathString += ids[i] + '%20';
  }
  return pathString;
}
