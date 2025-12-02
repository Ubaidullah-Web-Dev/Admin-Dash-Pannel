import React, { useState } from "react";
import { auth } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
            navigate("/"); // Go to dashboard after signup
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
            <form
                onSubmit={handleSignup}
                style={{
                    width: "350px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "10px"
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Signup</h2>

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
                    Create Account
                </button>
            </form>
        </div>
    );
}
