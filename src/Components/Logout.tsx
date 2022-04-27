import { Button } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../redux/slices/UserSlice";
import styles from "../styles/Dashboard.module.scss";

const Logout = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => dispatch(logout());
  return (
    <div className={styles.logout} onClick={handleLogout}>
      <Button variant="contained">Logout</Button>
    </div>
  );
};

export default Logout;
