import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import { BOOK_LINK } from "../../../helper";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../state/action-types";
import { Helmet } from "react-helmet";
import { BookType } from "../../../state/reducers/repositoriesReducer";
import Grid from "@mui/material/Grid";



const Container = styled.div`
  width: 1200px;
  max-width: 100%;
  background-color: var(--white-color);
  padding: 16px;
  display: flex;
`;

const Description = styled.div`
  padding: 16px;
  width: 60%;

  .product-name {
    font-size: 1.8rem;
    color: var(--text-color);
    font-weight: 300;
    margin-bottom: 8px;
  }

  .product-sale-number {
    font-weight: 200;
  }

  .product-item__price-current {
    color: var(--red-color);
    font-size: 32px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
  }

  .product-item__price-old {
    color: rgb(128, 128, 137);
    text-decoration: line-through;
    font-size: 14px;
    line-height: 20px;
  }

  .product-item__discount-rate {
    font-weight: 400;
    margin-left: 8px;
    border: 1px solid var(--red-color);
    border-radius: 2px;
    background-color: rgb(255, 240, 241);
    color: var(--red-color);
    line-height: 18px;
    font-size: 14px;
    padding: 0px 4px;
  }

  .product-voucher {
    display: block;
    overflow: hidden;
    border: 1px solid var(--primary-color);
    position: relative;
    background: #fff;
    padding-bottom: 5px;
    margin: 8px 0 5px;
  }

  .product-voucher-title {
    display: block;
    overflow: hidden;
    font-size: 14px;
    color: #fff;
    padding: 6px 10px;
    text-transform: uppercase;
    background: var(--primary-color);
    border-bottom: 1px solid #ddd;
    font-weight: 400;
  }

  .product-voucher-title-2 {
    display: block;
    overflow: hidden;
    font-size: 12px;
    color: #333;
    padding: 5px 10px 0;
  }

  .promotion-more {
    background: #f6f6f6;
    padding: 6px 10px;
    border: 1px solid #f1f1f1;
    border-bottom: none;
    font-size: 14px;
    text-transform: uppercase;
    width: 100%;
    margin-top: 16px;
  }

  ul {
    border: 1px solid #f1f1f1;
    padding: 5px 0 5px 25px;
    margin-bottom: 0;
    list-style: none;
  }
  
  .descr {
    border: 1px solid #f1f1f1;
    padding: 5px 0 5px 25px;
    margin-top: 20px;
    margin-bottom: 0;
    list-style: none;
  }

  .buttons {
    border: 1px solid #f1f1f1;
    padding: 5px 0 5px 25px;
    margin-top: 20px;
    margin-bottom: 0;
    list-style: none;
    display: flex;
    justify-content: space-between;
  }

  .items {
    font-size: 0.8rem;
  }

  li {
    font-size: 0.8rem;
  }

  .group-input {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-top: 8px;
  }

  .purchase {
    border: 1px solid #f1f1f1;
    padding: 5px 0 5px 25px;
    display: flex;
    justify-content: space-around;
    margin-top: 32px;
  }

  .input-quantity {
    padding: 8px 8px 9px 8px;
    border-top: 2px solid #1976d2;
    border-bottom: 2px solid #1976d2;
    border-left: 0;
    border-right: 0;
    box-shadow: none;
    -moz-appearance: textfield; /* Firefox */
    text-align: center;
    width: 60px;
  }

  .input-quantity:focus {
    outline: #1976d2;
  }

  .input-quantity::-webkit-outer-spin-button,
  .input-quantity::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
`;

const ProductDetail: React.FC = () => {
  const {
    isLoggedIn, token
  } = useTypedSelector((state) => state.repositories);

  const [book, setBook] = useState<BookType | null>(null);
  const [rated, setRated] = useState<Boolean>(false);
  const [yourRating, setYourRating] = useState<string>("1");

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const bookID = useParams<{ id?: string }>()!.id;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  let content = (
    <div style={{ padding: 64, fontSize: "2rem" }}>Sách không tồn tại</div>
  );

  let ratingstring = (<p>You haven't rate this book yet! Leave you rating now!</p>)
  let ratingcourage = (<>Leave your rating! </>);
  let ratingcourage2 = (<>Change your rating: </>)

  useEffect(() => {
    if (isLoggedIn) {
      fetch(
        BOOK_LINK + bookID,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          }
        })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return null;
          }
        })
        .then((bookfetch) => {
          setRated(bookfetch.userRating !== null);
          setBook(bookfetch);
          
          if (rated) {
            setYourRating(bookfetch.userRating);
          }
        })
        .catch((err) => {console.log(err)});

    } else {
      fetch(
        BOOK_LINK + bookID,
        {
          method: "GET",
        })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return null;
          }
        })
        .then((bookfetch) => {
          setBook(bookfetch);
        })
        .catch((err) => {console.log(err)});
    }

  
  }, [bookID, setBook, setRated])



  const sendRating = (rate: string) => {
    const fd = new FormData();
    fd.append("rating", rate);
    return fetch(
      BOOK_LINK + bookID + "/rating",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: fd,
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error("Cant change rating!");
        }
      })
      .then(() => {
        history.go(0)
      })
      .catch((err) => {console.log(err)});
    }
    
    const onSubmitHandler = () => {
      sendRating(yourRating);
  }
  
  const onRemoveHandler = () => {
    sendRating("-1");
    history.go(0)
  }

  if (book) {

    content = (
      <>
        <Container>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{book.title ?? "Book"}</title>
          </Helmet>
          
          <div style={{ width: "300px", marginLeft:"50px", marginRight:"50px", border: "1px solid #ccc" }}>
            <img src={book.imageURL} alt="Book Cover" style={{ width: "100%" }} />
          </div>
          <Description>
            <p className="product-name">{book.title}</p>

            <div className="promotion-more">
              <strong>Book Information</strong>
            </div>
            <div className="descr">
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                  <span className="items">Author: {book.authors}</span>
                </Grid>
                <Grid item xs={12}>
                  <span className="items">Published year: {book.publishedYear}</span>
                </Grid>
                <Grid item xs={12}>
                  <span className="items">Average rating: {book.rating.toFixed(0)}/5</span>
                </Grid>
              </Grid>
            </div>
            
            {!isLoggedIn && (
              <div className="descr">
                You can log in to rate this book
              </div>
            )}

            {isLoggedIn && (
              <>
                <div className="descr">
                  { !rated? ratingstring : (<p>Your rating is {book.userRating}</p>)}
                  { !rated? ratingcourage : ratingcourage2} 
                  <input 
                    type="number"
                    min="1"
                    max="5"
                    style={{width: 50}}
                    value={yourRating}
                    onChange={(e) => {setYourRating(e.target.value)}}
                  /> / 5
                    
                </div>

                <div className="buttons">
                  <div>
                      <Button
                        onClick={onSubmitHandler}
                        variant="contained"
                      >Submit Rating</Button> 
                  </div>
                  {
                    rated? (
                      <div>
                        <Button
                          style={{
                            backgroundColor: "#e65353",
                          }}
                          onClick={onRemoveHandler}
                          variant="contained"
                        >Remove Rating</Button>
                      </div>
                    ) : (<></>)
                  }
                </div>

              </>
            )}

            

          </Description>
        </Container>

      </>
    );
  }

  return content;
};

export default ProductDetail;
