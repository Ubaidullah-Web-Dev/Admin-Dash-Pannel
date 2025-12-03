import React, { useState } from "react";
import { auth } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography
} from "@mui/material";

export default function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            console.log("Signup Response:", userCredential);
            console.log("User:", userCredential.user);
            navigate("/");
        } catch (err) {
            setError(err.message);
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
                    Signup
                </Typography>
                {error && (
                    <Typography
                        color="error"
                        sx={{ textAlign: "center", mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSignup}>
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
                        Create Account
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}
