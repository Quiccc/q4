import { useState } from 'react';
import styles from './editUserModal.module.css';
import EditIcon from '@mui/icons-material/Edit';

export default function EditUserModal(props: any) {
  const [duplicateField, setDuplicateField] = useState("");
  const selectedUser = props.editedUser;
  const setFetchFlag = props.setFetchFlag;

  function editUser(editedUserCreds: any) {
    const editedUser = {
      firstName: editedUserCreds.get('editedFirstName'),
      lastName: editedUserCreds.get('editedLastName'),
      title: editedUserCreds.get('editedTitle'),
      email: editedUserCreds.get('editedEmail'),
      address: editedUserCreds.get('editedAddress'),
      phone: editedUserCreds.get('editedPhone'),
    };

    const putEditedUser = async () => {
      const options = {
        method: 'PUT',
      };

      const path = '/api/update-user?id=' + selectedUser.ID + '&firstName=' + editedUser.firstName + '&lastName=' + editedUser.lastName + '&email=' + editedUser.email + '&address=' + editedUser.address + '&phone=' + editedUser.phone + '&title=' + editedUser.title;
      const response = await fetch(path, options);

      if (response.status == 500) {
        const errorColumn = await response.json();
        setDuplicateField(errorColumn.error.split('.')[1]);
        return;
      }

      document.getElementById('editModalCloseAnchor')?.click();
      console.log(response.status + ': User edit successful.');

      setDuplicateField("");
      setFetchFlag(true);
    };

    putEditedUser()
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <button type="button" className={`${styles.modalOpenButton} ${'btn btn-dark me-2'}`} data-bs-toggle="modal" data-bs-target="#editUserModal">
        Edit <EditIcon />
      </button>
      <div className="modal fade" id="editUserModal" tabIndex={-1} aria-labelledby="editUserModalLabel" aria-hidden="true">
        <div className={`${styles.modalText} ${'modal-dialog modal-dialog-centered'}`}>
          <div className="modal-content">
            <form action={editUser}>
              <p className="fs-1 ms-3 me-3 mt-4 mb-2" id="editUserModalLabel">
                Edit a user.
              </p>
              <p className="fs-5 ms-3 me-3 mb-5">Change the information of a existing user.</p>
              <div className="modal-body d-flex flex-column">
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>First & Last Name</span>
                  <input type="text" id="editedFirstName" name="editedFirstName" aria-label="editedFirstName" className="form-control" defaultValue={selectedUser.FirstName} required />
                  <input type="text" id="editededitedPastName" name="editedLastName" aria-label="editedLastName" className="form-control" defaultValue={selectedUser.LastName} required />
                </div>
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>Title</span>
                  <input type="text" id="editedTitle" name="editedTitle" aria-label="editedTitle" className="form-control" defaultValue={selectedUser.Title} required />
                </div>
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>Email</span>
                  <input type="text" id="editedEmail" name="editedEmail" aria-label="editedEmail" className="form-control" defaultValue={selectedUser.Email} required />
                </div>
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>Address</span>
                  <input type="text" id="editedAddress" name="editedAddress" aria-label="editedAddress" className="form-control" defaultValue={selectedUser.Address} required />
                </div>
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>Phone</span>
                  <input type="text" id="editedPhone" name="editedPhone" aria-label="editedPhone" className="form-control" defaultValue={selectedUser.Phone} required />
                </div>
                  {duplicateField != "" ? <p className={`${styles.modalErrorText} ${'mt-4 mb-4'}`}>* This {duplicateField + (duplicateField == "phone" ? (" number") : (" address "))} belongs to another user.</p> : null}
                <button type="submit" className={`${styles.modalButton} ${'btn btn-dark'}`}>
                  Edit
                </button>
                <a id="editModalCloseAnchor" data-bs-dismiss="modal" hidden></a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
