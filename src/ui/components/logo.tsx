// Routing
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";

const Header = () => {
  // authentication state for styling:
  const navigate = useNavigate();

  return (
    <Typography
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
      variant='logo'
      onClick={() => {
        navigate("/");
      }}>
      TravelUp
    </Typography>
  );
};

export default Header;
