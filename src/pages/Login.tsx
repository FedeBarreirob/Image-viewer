import {
  EyeClosedIcon,
  EyeOpenIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useUserStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import useAlertStore from "../store/alertStore";
import { isValidUsername } from "../helpers/validators/usernameValidator";
import { isValidPassword } from "../helpers/validators/passwordValidator";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({ username: "", password: "" });
  const { openAlert } = useAlertStore();
  const setUser = useUserStore((state) => state.setUser);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const isUsernameValid = isValidUsername(userData.username);
    const isPasswordValid = isValidPassword(userData.password);

    if (!isUsernameValid) {
      openAlert("The username must contain only lowercase letters.", "red");
    } else if (!isPasswordValid) {
      openAlert(
        "The password must start with '123' and be followed by a lowercase name.",
        "red"
      );
    } else {
      setUser(userData);
      navigate("/home");
      openAlert("Login successful!", "green");
    }
  };

  return (
    <Box>
      <Flex className="centered-container">
        <Card style={{ padding: "2rem" }}>
          <Flex direction="column" gap="4">
            <Flex direction="column" align="center" gap="2">
              <Text size="6" weight="bold">
                Welcome back
              </Text>
              <Text size="2" color="gray">
                Enter your credentials to access your account
              </Text>
            </Flex>

            <form onSubmit={handleSubmit}>
              <Flex direction="column" gap="3">
                <TextField.Root name="username" onChange={handleChange}>
                  <TextField.Slot>
                    <PersonIcon />
                  </TextField.Slot>
                </TextField.Root>

                <TextField.Root
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  name="password"
                >
                  <TextField.Slot>
                    <LockClosedIcon />
                  </TextField.Slot>
                  <TextField.Slot>
                    {showPassword ? (
                      <EyeClosedIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <EyeOpenIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </TextField.Slot>
                </TextField.Root>
                <Button
                  type="submit"
                  size="3"
                  disabled={!userData.username || !userData.password}
                >
                  Sign in
                </Button>
              </Flex>
            </form>
          </Flex>
        </Card>
      </Flex>
      {/* {alert?.open && <CustomCallout alert={alert}/>} */}
    </Box>
  );
}
