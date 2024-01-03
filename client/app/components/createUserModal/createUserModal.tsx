import styles from './createUserModal.module.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState, useEffect } from 'react';

export default function CreateUserModal(props: any) {
  const [duplicateField, setDuplicateField] = useState("");
  const setFetchFlag = props.setFetchFlag;

  useEffect(() => {}, [duplicateField]);

  function createUser(newUserCreds: any) {
    const newUser = {
      firstName: newUserCreds.get('newFirstName'),
      lastName: newUserCreds.get('newLastName'),
      email: newUserCreds.get('newEmail'),
      address: newUserCreds.get('newAddress'),
      phone: newUserCreds.get('newPhone'),
      title: newUserCreds.get('newTitle'),
    };

    const postCreatedUser = async () => {
      const options = {
        method: 'POST',
      };

      const path = '/api/create-user?firstName=' + newUser.firstName + '&lastName=' + newUser.lastName + '&email=' + newUser.email + '&address=' + newUser.address + '&phone=' + newUser.phone + '&title=' + newUser.title;
      const response = await fetch(path, options);

      if (response.status == 500) {
        const errorColumn = await response.json();
        setDuplicateField(errorColumn.error.split('.')[1]);
        return;
      }

      document.getElementById('modalCloseAnchor')?.click();
      console.log(response.status + ': User creation successful.');

      setDuplicateField("");
      setFetchFlag(true);     
    };

    postCreatedUser()
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <button type="button" className={`${styles.modalOpenButton} ${'btn btn-dark me-2'}`} data-bs-toggle="modal" data-bs-target="#createUserModal">
        New <AddCircleIcon />
      </button>
      <div className="modal fade" id="createUserModal" tabIndex={-1} aria-labelledby="createUserModalLabel" aria-hidden="true">
        <div className={`${styles.modalText} ${'modal-dialog modal-dialog-centered'}`}>
          <div className="modal-content">
            <form action={createUser}>
              <p className="fs-1 ms-3 me-3 mt-4 mb-2" id="createUserModalLabel">
                Create a user.
              </p>
              <p className="fs-5 ms-3 me-3 mb-5">Fill every field to add a new user to the system.</p>
              <div className="modal-body d-flex flex-column">
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>First & Last Name</span>
                  <input type="text" id="newFirstName" name="newFirstName" aria-label="newFirstName" className="form-control" required />
                  <input type="text" id="newLastName" name="newLastName" aria-label="newLastName" className="form-control" required />
                </div>
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>Title</span>
                  <input type="text" id="newTitle" name="newTitle" aria-label="newTitle" className="form-control" required />
                </div>
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>Email</span>
                  <input type="text" id="newEmail" name="newEmail" aria-label="newEmail" className="form-control" required />
                </div>
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>Address</span>
                  <input type="text" id="newAddress" name="newAddress" aria-label="newAddress" className="form-control" required />
                </div>
                <div className="input-group mb-3">
                  <span className={`${styles.modalSpan} ${'input-group-text'}`}>Phone</span>
                  <input type="text" id="newPhone" name="newPhone" aria-label="newPhone" className="form-control" required />
                </div>
                {duplicateField != "" ? <p className={`${styles.modalErrorText} ${'mt-4 mb-4'}`}>* This {duplicateField + (duplicateField == "phone" ? (" number") : (" address "))} belongs to another user.</p> : null}
                <button type="submit" className={`${styles.modalButton} ${'btn btn-dark'}`}>
                  Add
                </button>
                <a id="modalCloseAnchor" data-bs-dismiss="modal" hidden></a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
