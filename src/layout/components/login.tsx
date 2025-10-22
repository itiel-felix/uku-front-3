import { useState } from "react"
import { register } from "../../services/api/user"
import { useAuth } from "../../hooks/useAuth"
const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
    const { login: loginService } = useAuth()
    const [password, setPassword] = useState("123456")
    const [type, setType] = useState("login")
    const [confirmPassword, setConfirmPassword] = useState("123456")
    const [email, setEmail] = useState("felixitiel13@gmail.com")
    const [isLoading, setIsLoading] = useState(false)

    const inputElement = (type: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => {
        return (
            <div className="flex flex-col">
                <label className="text-sm text-gray-500">{placeholder}</label>
                <input className="text-black border border-gray-300 p-2 rounded-md" type={type} placeholder={placeholder} value={value} onChange={onChange} />
            </div>
        )
    }
    const loginInfo = () => {
        return (
            <div className="flex flex-col gap-2">
                {inputElement("text", "Email", email, (e) => setEmail(e.target.value))}
                {inputElement("password", "Password", password, (e) => setPassword(e.target.value))}
                <button className="bg-[var(--safron-mango-dark)] text-white cursor-pointer p-2 rounded-md hover:bg-[var(--safron-mango-dark)]" onClick={handleLogin}>LOGIN</button>
                <span className="justify-center text-center pt-2 text-sm text-gray-500">Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => setType("register")}>Register</span></span>
            </div>
        )
    }

    const registerInfo = () => {
        return (
            <div className={`flex flex-col gap-2`}>
                {inputElement("text", "Email", email, (e) => setEmail(e.target.value))}
                {inputElement("password", "Password", password, (e) => setPassword(e.target.value))}
                {inputElement("password", "Confirm Password", confirmPassword, (e) => setConfirmPassword(e.target.value))}
                <button className="bg-[var(--safron-mango-dark)] text-white cursor-pointer p-2 rounded-md hover:bg-[var(--safron-mango-dark)]" onClick={handleRegister}>REGISTER</button>
                <span className="text-sm text-gray-500">Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => setType("login")}>Login</span></span>
            </div>
        )
    }
    const handleLogin = async () => {
        await loginService(email, password)
        onLoginSuccess()
    }
    const handleRegister = async () => {
        setIsLoading(true)
        try {
            // register the user
            await register({ username: email, email, password, confirmPassword })

            // login the user
            await loginService(email, password)
            onLoginSuccess()
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="w-full">
            {isLoading &&
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            }
            {type === "login" ? loginInfo() : registerInfo()}
        </div>
    )
}

export default Login