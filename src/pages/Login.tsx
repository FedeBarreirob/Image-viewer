import {
  EyeClosedIcon,
  EyeOpenIcon,
  FaceIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { isValidPassword, isValidUsername } from "../services/authService";
import AlertDialogComponent from "../components/AlertDialog";
import { IAlertDialog } from "../interfaces/alertDialog,interface";
import { useUserStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [alertDialog, setAlertDialog] = useState<IAlertDialog>({
    open: false,
    title: "",
    message: "",
  });
  const setUser = useUserStore((state) => state.setUser);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const isUsernameValid = isValidUsername(userData.username);
    const isPasswordValid = isValidPassword(userData.password);

    if (!isUsernameValid) {
      setAlertDialog({
        open: true,
        title: "Invalid Username",
        message: "The username must contain only lowercase letters.",
      });
    } else if (!isPasswordValid) {
      setAlertDialog({
        open: true,
        title: "Invalid Password",
        message:
          "The password must start with '123' and be followed by a lowercase name.",
      });
    } else {
      setUser(userData);
      navigate("/home");
    }
  };

  return (
    <Box>
      <Flex align="center" justify="center" style={{ height: "100vh" }} p="4">
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

            <Flex direction="column" gap="3">
              <TextField.Root name="username" onChange={handleChange}>
                <TextField.Slot>
                  <FaceIcon />
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
                onClick={handleSubmit}
                disabled={!userData.username || !userData.password}
              >
                Sign in
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>

      {alertDialog.open && (
        <AlertDialogComponent
          title={alertDialog.title}
          message={alertDialog.message}
          handleClose={() => setAlertDialog({ ...alertDialog, open: false })}
        />
      )}
    </Box>
  );
}
