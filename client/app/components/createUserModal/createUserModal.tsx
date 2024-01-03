import styles from './createUserModal.module.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState, useEffect } from 'react';

export default function CreateUserModal(props: any) {
  const [duplicateField, setDuplicateField] = useState(''); // duplicateField is used to display an error message when a duplicate field is entered.
  const setFetchFlag = props.setFetchFlag; // Imported from parent component to trigger a data fetch on success.

  useEffect(() => {}, [duplicateField]); // useEffect hook to re-render component when duplicateField is updated.

  /* 
  Function Description: 
  Fetches data from HTML form and sends it to the server to create a new user.
  On success, closes the modal and triggers a data fetch in the parent component.
  On failure, displays an error message on modal.

  Param:
  newUserCreds: HTML form data.
  */
  function createUser(newUserCreds: any) {
    //User model object to be posted.
    const newUser = {
      firstName: newUserCreds.get('newFirstName'),
      lastName: newUserCreds.get('newLastName'),
      email: newUserCreds.get('newEmail'),
      address: newUserCreds.get('newAddress'),
      phone: newUserCreds.get('newPhone'),
      title: newUserCreds.get('newTitle'),
    };

    // POST request to create a new user.
    const postCreatedUser = async () => {
      const options = {
        method: 'POST',
      };

      //URL Path of the POST request with new users parameters.
      const path = '/api/create-user?firstName=' + newUser.firstName + '&lastName=' + newUser.lastName + '&email=' + newUser.email + '&address=' + newUser.address + '&phone=' + newUser.phone + '&title=' + newUser.title;
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

      document.getElementById('modalCloseAnchor')?.click(); // Close modal on success.
      console.log(response.status + ': User creation successful.');

      // Reset duplicateField and trigger a data fetch in the parent component.
      setDuplicateField('');
      setFetchFlag(true);
    };

    postCreatedUser().catch((err) => console.log(err)); // Catch any errors.
  }

  return (
    <div>
      {/* Button to open modal. Rendered at parent component. */}
      <button type="button" className={`${styles.modalOpenButton} ${'btn btn-dark me-2'}`} data-bs-toggle="modal" data-bs-target="#createUserModal">
        New <AddCircleIcon />
      </button>
      {/* Modal */}
      <div className="modal fade" id="createUserModal" tabIndex={-1} aria-labelledby="createUserModalLabel" aria-hidden="true">
        <div className={`${styles.modalText} ${'modal-dialog modal-dialog-centered'}`}>
          <div className="modal-content">
            <p className="fs-1 ms-3 me-3 mt-4 mb-2" id="createUserModalLabel">
              Create a user.
            </p>
            <p className="fs-5 ms-3 me-3 mb-5">Fill every field to add a new user to the system.</p>
            <div className="modal-body d-flex flex-column">
              {/* Form to create a new user. */}
              <form action={createUser}>
                {/* Input fields. */}
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>First & Last Name</span>
                  {/* First and last name inputs */}
                  <input type="text" id="newFirstName" name="newFirstName" aria-label="newFirstName" className="form-control" required />
                  <input type="text" id="newLastName" name="newLastName" aria-label="newLastName" className="form-control" required />
                </div>
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>Title</span>
                  {/* Title input */}
                  <input type="text" id="newTitle" name="newTitle" aria-label="newTitle" className="form-control" required />
                </div>
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>Email</span>
                  {/* Email input */}
                  <input type="text" id="newEmail" name="newEmail" aria-label="newEmail" className="form-control" required />
                </div>
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>Address</span>
                  {/* Address input */}
                  <input type="text" id="newAddress" name="newAddress" aria-label="newAddress" className="form-control" required />
                </div>
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>Phone</span>
                  {/* Phone input */}
                  <input type="text" id="newPhone" name="newPhone" aria-label="newPhone" className="form-control" required />
                </div>
                {/* Error message for duplicate field. */}
                {duplicateField != '' ? <p className={`${styles.modalErrorText} ${'mt-4 mb-4'}`}>* This {duplicateField + (duplicateField == 'phone' ? ' number' : ' address ')} belongs to another user.</p> : null}
                {/* Submit button */}
                <button type="submit" className={`${styles.modalButton} ${'btn btn-dark'}`}>
                  Add
                </button>
                {/* Hidden anchor to close modal on success. */}
                <a id="modalCloseAnchor" data-bs-dismiss="modal" hidden></a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
