import styles from './deleteUser.module.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function DeleteUser(props: any) {
  const selectedUsers = props.selectedUsers; // Imported from parent, array of IDs belonging to the users to be deleted.
  const setSelecetedUsers = props.setSelecetedUsers; // Imported from parent, used to reset selectedUsers array on success.
  const setFetchFlag = props.setFetchFlag; // Imported from parent to trigger a data fetch on success.

  /*
  Function Description:
  Sends a DELETE request to the server to delete users.
  Triggered by the delete button.

  On success: 
  Deletes the users with the IDs in selectedUsers array 
  Resets selectedUsers array to empty
  Triggers a data fetch in the parent component.
  */
  async function deleteUsers() {
    const options = {
      method: 'DELETE',
    };

    //URL Path of the DELETE request with IDs of users to be deleted.
    const path = '/api/delete-users?ids=' + toPathString(selectedUsers);

    await fetch(path, options)
      .then((res) => {
        if (res.status == 200) {
          setSelecetedUsers([]); // Reset selectedUsers array to empty.
          setFetchFlag(true); // Trigger a data fetch in the parent component.
          console.log(res.status + ': User deletion successful.');
        }
      })
      .catch((err) => console.log(err)); // Catch any errors.
  }

  return (
    <button type="button" className={`${styles.deleteButton} ${'btn btn-dark me-2'}`} onClick={() => deleteUsers().catch((err) => console.log(err))}>
      Delete <DeleteForeverIcon />
    </button>
  );
}

/*
Function Description:
Helper function to build a string of IDs separated by %20 for the URL parameters.

Param:
ids: Array of IDs to be deleted.

Return:
String of IDs separated by %20.
*/
function toPathString(ids: number[]) {
  let pathString = '';
  for (let i = 0; i < ids.length; i++) {
    pathString += ids[i] + '%20';
  }
  return pathString;
}
