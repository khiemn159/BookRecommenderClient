import { Link } from "react-router-dom";
import HeaderOptions from "./HeaderOptions";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import SearchInput from "./SearchInput";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>
          <Link to="/" className="link">
            <FontAwesomeIcon icon={faBook} style={{ marginRight: "4px" }} />
            BRS
          </Link>
        </h1>
        {/* <SearchInput /> */}
        <HeaderOptions />
      </div>
    </header>
  );
};

export default Header;
