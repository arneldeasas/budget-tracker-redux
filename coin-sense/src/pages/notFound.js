import { useRouter } from "next/router";
import format from "date-fns/format";
const NotFound = () => {
    const router = useRouter();
    const today = new Date();
    return ( 
        <div>
            404 not found!
            <button 
                onClick={()=>{router.push(`/dashboard/${format(today,'MMMM')}`)}} 
                className="bg-gray-100 block">GO BACK</button>
        </div>
     );
}
 
export default NotFound;