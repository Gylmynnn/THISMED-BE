import { FormEvent } from "react";
// import { FlickeringGridRoundedDemo } from "@/components/testaasas";

export default function LoginPage() {
    // const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        console.log(result.data);
        console.log("hallo world");
    }


    return (
        <div className="relative">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-1/2 mx-auto pt-32 gap-6"
            >
                <input type="email" name="email" placeholder="Email" required />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
