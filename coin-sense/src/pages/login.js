import {format} from "date-fns";
import Link from "next/link";
const Login = () => {
    const today = new Date()
    console.lo
    return ( 
        <div>
            <h2>username</h2>
            <h2>password</h2>

            <Link href={'/dashboard/'+ format(today,'MMMM')}>
                <div>
                    login
                </div>
            </Link>
            <Link href='/signup'>
                <div className="bg-green-400">signup</div>
            </Link>
        </div>
     );
}
 
export default Login;