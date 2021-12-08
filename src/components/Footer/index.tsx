import { Link } from "react-router-dom";
import "./index.css";
import { toast } from "react-toastify";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="grid">
        <div className="grid__row">

        </div>
      </div>
      <div className="footer__bottom">
        <div className="grid">
          <p className="footer__text">
            © 2021 BRS. All right reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
