import Login from "../Components/Login";

import styles from "../styles/Login.module.scss";

const ViewLogin = () => {
  return (
    <div className={styles.login__main}>
      <div className={styles.login__pad}>
        <Login />
      </div>
    </div>
  );
};

export default ViewLogin;
