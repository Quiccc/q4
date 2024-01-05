import { useState } from 'react';
import styles from './editUserModal.module.css';
import EditIcon from '@mui/icons-material/Edit';

export default function EditUserModal(props: any) {
  const [duplicateField, setDuplicateField] = useState(''); // duplicateField is used to display an error message when a duplicate field is entered.
  const setFetchFlag = props.setFetchFlag; // Imported from parent component to trigger a data fetch on success.
  const selectedUser = props.editedUser; // Imported from parent component, contains the ID of the user to be edited.

  function editUser(editedUserCreds: any) {
    //User model object to be updated.
    const editedUser = {
      firstName: editedUserCreds.get('editedFirstName'),
      lastName: editedUserCreds.get('editedLastName'),
      title: editedUserCreds.get('editedTitle'),
      email: editedUserCreds.get('editedEmail'),
      address: editedUserCreds.get('editedAddress'),
      phone: editedUserCreds.get('editedPhone'),
    };

    /* 
    Function Description: 
    Fetches data from HTML form and sends it to the server to update the user.
    On success, closes the modal and triggers a data fetch in the parent component.
    On failure, displays an error message on modal.

    Param:
    newUserCreds: HTML form data.
    */
    const putEditedUser = async () => {
      const options = {
        method: 'PUT',
      };

      //URL Path of the PUT request with updated users parameters.
      const path = '/api/update-user?id=' + selectedUser.ID + '&firstName=' + editedUser.firstName + '&lastName=' + editedUser.lastName + '&email=' + editedUser.email + '&address=' + editedUser.address + '&phone=' + editedUser.phone + '&title=' + editedUser.title;
      const response = await fetch(path, options);

      /*
      Set duplicateField to the field that is duplicate.
      value is used in the TSX section down-below.
      */
      if (response.status == 500) {
        const errorColumn = await response.json();
        setDuplicateField(errorColumn.error.split('.')[1]);
        return;
      }

      document.getElementById('editModalCloseAnchor')?.click(); // Close modal on success.
      console.log(response.status + ': User edit successful.');

      // Reset duplicateField and trigger a data fetch in the parent component.
      setDuplicateField('');
      setFetchFlag(true);
    };

    // Catch any errors.
    putEditedUser().catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      {/* Button to open modal. Rendered at the parent component */}
      <button type="button" className={`${styles.modalOpenButton} ${'btn btn-dark me-2'}`} data-bs-toggle="modal" data-bs-target="#editUserModal">
        Edit <EditIcon />
      </button>
      {/* Modal */}
      <div className="modal fade" id="editUserModal" tabIndex={-1} aria-labelledby="editUserModalLabel" aria-hidden="true">
        <div className={`${styles.modalText} ${'modal-dialog modal-dialog-centered'}`}>
          <div className="modal-content" style={{ borderColor: 'transparent' }}>
            <div className={styles.modalText}>
              <p className="fs-1 ms-3 me-3 mt-4 mb-2" id="editUserModalLabel">
                Edit a user.
              </p>
              <p className="fs-5 ms-3 me-3">Change the information of a existing user.</p>
            </div>
            <div className="modal-body d-flex flex-column">
              {/* Form to edit a user. */}
              <form action={editUser}>
                {/* Input fields. */}
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>First & Last Name</span>
                  {/* First and last name inputs. */}
                  <input type="text" id="editedFirstName" name="editedFirstName" aria-label="editedFirstName" className={`${styles.formInput} ${'form-control'}`} defaultValue={selectedUser.FirstName} required />
                  <input type="text" id="editededitedPastName" name="editedLastName" aria-label="editedLastName" className={`${styles.formInput} ${'form-control ms-1'}`} defaultValue={selectedUser.LastName} required />
                </div>
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>Title</span>
                  {/* Title input. */}
                  <input type="text" id="editedTitle" name="editedTitle" aria-label="editedTitle" className={`${styles.formInput} ${'form-control'}`} defaultValue={selectedUser.Title} required />
                </div>
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>Email</span>
                  {/* Email input. */}
                  <input type="text" id="editedEmail" name="editedEmail" aria-label="editedEmail" className={`${styles.formInput} ${'form-control'}`} defaultValue={selectedUser.Email} required />
                </div>
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>Address</span>
                  {/* Address input. */}
                  <input type="text" id="editedAddress" name="editedAddress" aria-label="editedAddress" className={`${styles.formInput} ${'form-control'}`} defaultValue={selectedUser.Address} required />
                </div>
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>Phone</span>
                  {/* Phone input. */}
                  <input type="text" id="editedPhone" name="editedPhone" aria-label="editedPhone" className={`${styles.formInput} ${'form-control'}`} defaultValue={selectedUser.Phone} required />
                </div>
                {/* Error message for duplicate field. */}
                {duplicateField != '' ? <p className={`${styles.modalErrorText} ${'mt-4 mb-4'}`}>* This {duplicateField + (duplicateField == 'phone' ? ' number' : ' address ')} belongs to another user.</p> : null}
                {/* Submit button. */}
                <button type="submit" className={`${styles.modalButton} ${'btn btn-dark'}`}>
                  Edit
                </button>
              </form>
              {/* Hidden anchor to close modal on success. */}
              <a id="editModalCloseAnchor" data-bs-dismiss="modal" hidden></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
