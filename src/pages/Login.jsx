import React, { useState } from "react";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography
} from "@mui/material";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("Login Response:", userCredential);
            console.log("User:", user);
            navigate("/dashboard");

        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                mt: 20
            }}>
            <Paper
                elevation={5}
                sx={{
                    width: 350,
                    p: 3,
                    borderRadius: 3
                }}>
                <Typography
                    variant="h5"
                    sx={{ textAlign: "center", mb: 2 }}>
                    Login
                </Typography>
                {error && (
                    <Typography
                        color="error"
                        sx={{ textAlign: "center", mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleLogin}>
                    <TextField
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        margin="normal"/>
                    <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"/>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, py: 1.2 }}>
                        Login
                    </Button>
                </form>
                <Typography sx={{ textAlign: "center", mt: 2 }}>
                    Don't have an account?{" "}
                    <Typography
                        component="span"
                        color="primary"
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate("/signup")}>
                        Create one
                    </Typography>
                </Typography>
            </Paper>
        </Box>
    );
}
