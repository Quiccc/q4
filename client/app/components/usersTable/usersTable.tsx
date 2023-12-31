import { Container, Table } from "react-bootstrap";

export default function UsersTable() {
  return (
    <Container className="my-auto">
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Employee Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexCheckDefault"
                />
              </div>
            </td>
            <td>Test Name</td>
            <td>Test Position</td>
            <td>email@test.com</td>
            <td>Test Avenue 3425</td>
            <td>456456456</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
