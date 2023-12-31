import { Container } from "react-bootstrap";
import UsersTable from "./components/usersTable/usersTable";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

export default function Home() {
  return (
    <body className="d-flex flex-column">
      <Header />
      <UsersTable />
      <Footer />
    </body>
  );
}
