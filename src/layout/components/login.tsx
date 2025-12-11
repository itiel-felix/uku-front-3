import { useState } from "react"
import { register } from "../../services/api/user"
import { useAuth } from "../../hooks/useAuth"
const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
    const { login: loginService } = useAuth()
    const [email, setEmail] = useState("testUser@gmail.com")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [type, setType] = useState("login")
    const [hasWrongPassowrd, setHasWrongPassword] = useState(false);
    const [displayUserDoesNotExist, setDisplayUserDoesNotExist] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const inputElement = (type: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => {
        let dynamicClass = "text-black border border-gray-300 p-2 rounded-md"
        if(hasWrongPassowrd) dynamicClass+=" border-red-500"
        return (
            <div className="flex flex-col">
                <label className="text-sm text-gray-500">{placeholder}</label>
                <input className={dynamicClass} type={type} placeholder={placeholder} value={value} onChange={onChange} />
            </div>
        )
    }
    const resetInfo = () => {
        setPassword('')
        setConfirmPassword('')
        setHasWrongPassword(false)
    }
    const loginInfo = () => {
        return (
            <div className="flex flex-col gap-2">
                {inputElement("text", "Email", email, (e) => setEmail(e.target.value))}
                {inputElement("password", "Password", password, (e) => setPassword(e.target.value))}
                {displayUserDoesNotExist && <span className='
                justify-center text-center pt-2 text-sm text-red-500'> User not found</span>}
                <button className="bg-[var(--safron-mango-dark)] text-white cursor-pointer p-2 px-4 rounded-full hover:bg-[var(--safron-mango)]" onClick={handleLogin}>Sign in</button>
                <span className="justify-center text-center pt-2 text-sm text-gray-500">Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => {
                    setType("register")
                    resetInfo()
                    }
                    }>Register</span></span>
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
                <span className="text-sm text-gray-500">Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => {
                    setType("login")
                    resetInfo()
                }}>Login</span></span>
            </div>
        )
    }
    const handleLogin = async () => {
        try{
            await loginService(email, password)
            onLoginSuccess()
        } catch (e) {
            if(e.error == 'WRONG_PASSWORD'){
                setHasWrongPassword(true)
            }
            if(e.error == "NO_USER"){
                setDisplayUserDoesNotExist(true)
            }

        }
    }
    const handleRegister = async () => {
        setIsLoading(true)
        try {
            // register the user
            if(confirmPassword == password)
                await register({ email, password})
            else {
                setHasWrongPassword(true)
                throw Error
            }

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