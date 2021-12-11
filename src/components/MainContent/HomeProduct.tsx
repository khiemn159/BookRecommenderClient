import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { BookType } from "../../state/reducers/repositoriesReducer";
import "./index.css";

const HomeProduct: React.FC<{ data: BookType }> = (props) => {
  const {
    id,
    title,
    rating,
    imageURL,
  } = props.data;

  const Star = rating? parseInt(rating.toFixed(0)) : 0;

  return (
    <div className="grid__column-2-4">
      <Link to={`/product-detail/${id}`} className="home-product-item">
        <div
          className="home-product-item__img"
          style={{
            backgroundImage: `url(${imageURL})`,
          }}
        ></div>
        <h4 className="home-product-item__name">{title}</h4>

        <div className="home-product-item__action">

          <div className="home-product-item__rating">
            {Array.from({ length: Star }, (_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className="home-product-item__star--gold"
              />
            ))}
            {Array.from({ length: 5 - Star }, (_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                style={{ color: "#ccc" }}
              />
            ))}
          </div>
          {/* <span style={{ fontSize: "0.8rem", marginLeft: "8px" }}>
            ({rating? rating : 0})
          </span> */}
        </div>

      </Link>
    </div>
  );
};

export default HomeProduct;
