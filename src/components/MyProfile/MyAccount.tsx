import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { storage } from "../../firebase";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ActionType } from "../../state/action-types";
import { UPDATE_PROFILE_LINK } from "../../helper";


const Input = styled("input")({
  display: "none",
});

const MyAccount: React.FC = () => {
  const user = useTypedSelector((state) => state.repositories.user);
  const [username, setUsername] = useState(user.id);
  const [nameInput, setNameInput] = useState(user.name);
  const [emailInput, setEmailInput] = useState(user.email);
  const [countryInput, setCountryInput] = useState(user.country);
  const [ageInput, setAgeInput] = useState(user.age);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [url, setUrl] = useState(user.avatar);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setUsername(user.id);
    setNameInput(user.name);
    setEmailInput(user.email);
    setCountryInput(user.country);
    setAgeInput(user.age);
    
    setUrl(user.avatar);
  }, [user.name, user.avatar]);

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (image) {
      setIsLoading(true);
      const uploadTask = storage.ref(`avatarUser/${user.email}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          toast.error("Không thể tại ảnh lên. Vui lòng thử lại!");
          setIsLoading(false);
        },
        () => {
          storage
            .ref("avatarUser")
            .child(user.email)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              setIsLoading(false);
            });
        }
      );
    }
  }, [image, user.email]);

  const {token} = useTypedSelector((state) => state.repositories);

  const onUpdateUser = () => {
    const fd = new FormData();
    if (nameInput) fd.append("name", nameInput);
    if (emailInput) fd.append("mail", emailInput);
    if (countryInput) fd.append("country", countryInput);
    if (ageInput) fd.append("age", ageInput.toString());

    setIsLoading(true);
    fetch(
      UPDATE_PROFILE_LINK,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: fd,
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Có lỗi xảy ra, lưu thất bại";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setIsLoading(false);
        toast.success("Cập nhật thành công!");
        
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.message);
      });
  };

  return user.name ? (
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
            <Avatar
              alt={user.name}
              src={url}
              sx={{ width: 180, height: 180 }}
            />
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
            <Button variant="outlined" component="span">
              Chọn ảnh
            </Button>
          </label>
        </Stack>
      </div>
      <div style={{ width: "50%", padding: "16px" }}>
        <TextField
          margin="normal"
          disabled
          id="outlined-basic"
          label="Tên đăng nhập"
          style={{ width: "100%", marginBottom: "20px" }}
          value={username}
        />
        <TextField
          margin="normal"
          id="outlined-basic"
          label="Họ và tên đệm"
          style={{ width: "100%", marginBottom: "20px" }}
          value={nameInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNameInput(e.target.value);
          }}
        />
        <TextField
          margin="normal"
          id="outlined-basic"
          label="Email"
          style={{ width: "100%", marginBottom: "20px" }}
          value={emailInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmailInput(e.target.value);
          }}
        />
        <TextField
          margin="normal"
          id="outlined-basic"
          label="Tuổi"
          style={{ width: "100%", marginBottom: "20px" }}
          value={ageInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value) setAgeInput(parseFloat(e.target.value));
            else setAgeInput(0);
          }}
        />

        <TextField
          margin="normal"
          id="outlined-basic"
          label="Quốc gia"
          style={{ width: "100%", marginBottom: "20px" }}
          value={countryInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCountryInput(e.target.value);
          }}
        />
        <Button
          variant="contained"
          component="span"
          onClick={onUpdateUser}

        >
          Lưu
        </Button>
      </div>

    </div>
  ) : (
    <></>
  );
};

export default MyAccount;
