import { IconButton, InputAdornment, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { useFormik } from "formik";
import { loginSchema } from "../YupSchemas";
import { useLoginMutation } from "../redux/apis/AuthAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { addUserDetails } from "../redux/slices/UserSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [loginUser, { data, isLoading, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => login(values),
  });

  const login = async (values: any) => {
    await loginUser(values);
  };

  useEffect(() => {
    if (data) {
      dispatch(
        addUserDetails({
          username: formik.values.username,
          accessToken: data?.accessToken,
        })
      );
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, navigate]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="username"
        style={{ marginBottom: "3%" }}
        label="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.username)}
        helperText={formik.errors.username}
      />
      <TextField
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        type={!showPassword ? "password" : "text"}
        id="password"
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.password)}
        helperText={formik.errors.password}
      />
      {error && <div style={{ color: "red" }}>Wrong username or password</div>}

      <LoadingButton
        loading={isLoading}
        style={{ marginTop: "3%" }}
        variant="contained"
        size="large"
        type="submit"
        disabled={
          Object.values(formik.values).every((v) => v.length === 0) ||
          Object.keys(formik.errors).length > 0
        }
      >
        Login
      </LoadingButton>
    </form>
  );
};

export default Login;
