// @ts-nocheck
import { BiSearch } from "react-icons/bi";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const Navbar = ({ navSearchTerm, searchImagesChange }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between gap-4 bg-white px-4 py-4 sm:justify-center md:px-12 lg:px-24">
      <h1 className="flex-[0.5] whitespace-nowrap font-pattaya text-lg font-medium sm:text-[4vw] md:text-[3vw] lg:text-4xl">
        Image Gallery
      </h1>
      <div className="hidden flex-1 items-center gap-1 rounded-md bg-[#ECECEC] px-2 py-1 shadow-inner sm:flex ">
        <BiSearch className="text-neutral-500" size={24} />
        <input
          value={navSearchTerm}
          onChange={searchImagesChange}
          type="text"
          className="w-full bg-transparent py-2 px-1 focus:outline-none"
          placeholder="Search Images here"
        />
      </div>
      <div className="flex items-center justify-evenly lg:flex-1">
        <h4 className="hidden lg:block">Explore</h4>
        <h4 className="hidden lg:block">Collection</h4>
        <h4 className="hidden lg:block">Community</h4>
        <div className="flex items-center gap-2">
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} />}
            label="Dark Mode"
            className="text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
