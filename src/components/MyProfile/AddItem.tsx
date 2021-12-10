import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { BOOK_ADD_LINK } from "../../helper";

const altUrl = "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png"

const Input = styled("input")({
  display: "none",
});

const AddItem: React.FC = () => {
  const { user, token } = useTypedSelector((state) => state.repositories);
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookAuthor, setBookAuthor] = useState<string>("");
  const [bookPublishYear, setBookPublishYear] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [url, setUrl] = useState(user.avatar);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };



  const onCreateBook = () => {
    const fd = new FormData();
    fd.append("title", bookTitle);
    fd.append("authors", bookAuthor);
    fd.append("publishedYear", bookPublishYear);
    fd.append("imageURL", altUrl);
    fetch(
      BOOK_ADD_LINK,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: fd
      })
      .then((res) => {
        if (res.ok) {
          toast("Add book success!");
        } else {
          throw Error("cant add book");
        }
      })
      .catch((err) => {toast.error(err)});
    // toast("Add book success!");
  }

  return user.isAdmin ? (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        textAlign: "center",
        backgroundColor: "var(--white-color)",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 180,
            height: 180,
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoading ? (
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress color="secondary" />
            </Stack>
          ) : (
            <img src={altUrl} alt="Book Cover" style={{ width: "100%" }} />
          )}
        </div>

        <Stack direction="row" alignItems="center" spacing={2}>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleChange}
            />
            <Button style={{marginTop: 20}} variant="outlined" component="span">
              Add Cover
            </Button>
          </label>
        </Stack>
      </div>
      <div style={{ width: "50%", padding: "16px" }}>
        <TextField
          margin="normal"
          required
          id="outlined-basic"
          label="Book Title"
          style={{ width: "100%", marginBottom: "20px" }}
          value={bookTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBookTitle(e.target.value);
          }}
        />
        <TextField
          margin="normal"
          id="outlined-basic"
          label="Author"
          style={{ width: "100%", marginBottom: "20px" }}
          value={bookAuthor}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBookAuthor(e.target.value);
          }}
        />
        <TextField
          margin="normal"
          id="outlined-basic"
          label="Publish Year"
          style={{ width: "100%", marginBottom: "20px" }}
          value={bookPublishYear}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBookPublishYear(e.target.value);
          }}
        />
        

        <Button
          variant="contained"
          component="span"
          onClick={onCreateBook}

        >
          Add Book
        </Button>
      </div>

    </div>
  ) : (
    <></>
  );
};

export default AddItem;
