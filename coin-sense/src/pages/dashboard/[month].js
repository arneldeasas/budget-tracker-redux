import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "@/redux/counter";
import Layout from "../../components/layout";



const DashboardContent = () => {
    const {count} = useSelector((state)=> state.counter);
    const dispatch = useDispatch();

    const router = useRouter();
    const {month} = router.query


    return ( 
        <div>
            <Layout >
                {month}
                <Link href={`/dashboard/${month}/report`}><div className="bg-blue-400 text-white p-3 rounded-md">monthly report</div></Link>
                <div>
                    <div>
                        <button
                        aria-label="Increment value"
                        onClick={() => dispatch(increment())}
                        >
                        Increment
                        </button>
                        <span>{count}</span>
                        <button
                        aria-label="Decrement value"
                        onClick={() => dispatch(decrement())}
                        >
                        Decrement
                        </button>
                    </div>
                </div>
            </Layout>
            
        </div>
        
     );
}
 
export default DashboardContent;