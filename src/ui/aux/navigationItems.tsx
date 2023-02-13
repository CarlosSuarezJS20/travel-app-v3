import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LuggageIcon from "@mui/icons-material/Luggage";
import AddTaskIcon from "@mui/icons-material/AddTask";
import ExploreIcon from "@mui/icons-material/Explore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";

export const profileMenuToolTipItems = [
  {
    itemName: "My Profile",
    path: "/my-profile",
  },
  { itemName: "My Trips", path: "/my-trips" },
  {
    itemName: "My WishList",
    path: "/my-wishlist",
  },
  {
    itemName: "Explore",
    path: "/search-travel",
  },
];

export const drawerMenuItems = [
  {
    itemName: "My Profile",
    path: "/my-profile",
    icon: AccountCircleIcon,
  },
  { itemName: "My Trips", path: "/my-trips", icon: LuggageIcon },
  {
    itemName: "My WishList",
    path: "/my-wishlist",
    icon: AddTaskIcon,
  },
  {
    itemName: "Explore",
    path: "/search-travel",
    icon: ExploreIcon,
  },
  {
    itemName: "Maps",
    path: "/maps",
    icon: LocationOnIcon,
  },
  { itemName: "Home", path: "/", icon: HomeIcon },
  { itemName: "About", path: "/about", icon: InfoIcon },
];
