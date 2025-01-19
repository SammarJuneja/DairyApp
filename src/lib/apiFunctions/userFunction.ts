
// Register/Signup
export async function register(username: string, email: string, password: string) {
    try {
        const response = await fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Signup failed: ${errorData.message || "Unknown error"}`);
        }
    
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error("Signup error:", error);
        return { message: error.message || "An unexpected error occurred." };
    }
}

// Login
export async function login(username: string, password: string) {
    try {
        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Login failed: ${errorData.message || "Unknown error"}`);
        }
    
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error("Login error:", error);
        return { message: error.message || "An unexpected error occurred." };
    }
}
