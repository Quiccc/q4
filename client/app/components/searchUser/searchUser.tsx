import styles from './searchUser.module.css';
import { useEffect } from 'react';

export default function SearchUser(props: any) {
  const users = props.users; // Imported from parent component, contains a list of all users.
  const foundUsers = props.foundUsers; // Imported from parent component, contains a list of users that match the search query. Used in userTable component.
  const setFoundUsers = props.setFoundUsers; // Imported from parent component, sets the state of foundUsers.
  const setSelecetedUsers = props.setSelecetedUsers; // Imported from parent component, sets the state of selectedUsers. Re-renders the userTable component on change.

  //Re-render the component after data fetch.
  useEffect(() => {
    setFoundUsers(users);
    setSelecetedUsers([]);
  }, [users]);

  /*
    Function Description:
    Handler function for the search bar input.
    Filters the list of users based on the search query.
    Conducts search based on first name and last name.
    Sets the state of foundUsers to the filtered list of users.

    Param:
    e: React.ChangeEvent<HTMLInputElement>
     */
  function searchUser(e: React.ChangeEvent<HTMLInputElement>) {
    // If search bar is empty, show all users.
    if (e.target.value === '') {
      setFoundUsers(users);
      setSelecetedUsers([]);
      return;
    }

    // Filter users based on search query.
    const res = users.filter((user: any) => {
      return (user.FirstName + user.LastName).toLowerCase().includes(e.target.value.toLowerCase()); // Search based on normalized first name and last name.
    });
    setFoundUsers(res);
    setSelecetedUsers([]);
  }

  return (
    <div className="d-flex flex-grow-1">
      {/* Search bar. */}
      {users.length > 0 ? (
        <input type="text" className={`${styles.searchBar} ${'form-control ms-5 w-50'}`} id="searchBar" placeholder="Search" onChange={searchUser} />
      ) : (
        <input type="text" className={`${styles.searchBar} ${'form-control ms-5 w-50'}`} id="searchBarDisabled" placeholder="Search" disabled />
      )
      }
      {/* Result text. */}
      <p className={`${styles.resultText} ${'my-auto ms-3 text-wrap'}`}>
        Showing {foundUsers.length} out of {users.length} users.
      </p>
    </div>
  );
}
