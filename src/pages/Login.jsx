import React, { useState } from "react";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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


            // -----------------------------------
            // 🍪 STORE USER DATA IN COOKIES
            // -----------------------------------
            Cookies.set("uid", user.uid, { expires: 7 });
            Cookies.set("refreshToken", user.refreshToken, { expires: 7 });
            Cookies.set("accessToken", user.accessToken, { expires: 1 });
            // -----------------------------------
            navigate("/dashboard"); // redirect to dashboard

        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
            <form
                onSubmit={handleLogin}
                style={{
                    width: "350px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "10px"
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

                {error && (
                    <p style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
                        {error}
                    </p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        borderRadius: "5px",
                        border: "1px solid #ccc"
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        borderRadius: "5px",
                        border: "1px solid #ccc"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        background: "#111827",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>

                <p style={{ textAlign: "center", marginTop: "15px" }}>
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        style={{ color: "#2563eb", cursor: "pointer" }}
                    >
                        Create one
                    </span>
                </p>
            </form>
        </div>
    );
}
