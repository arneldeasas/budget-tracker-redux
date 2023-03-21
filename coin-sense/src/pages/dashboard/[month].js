import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "@/redux/counter";
import Layout from "../../components/layout";
import Navbar from "@/components/navbar";
import DashboardContent from "@/components/dashboardcontent";

const Dashboard = () => {
    const {count} = useSelector((state)=> state.counter);
    const dispatch = useDispatch();

    const router = useRouter();
    const {month} = router.query


    return ( 
        <div>
            <Layout >
                
                <DashboardContent  />
                
                <Navbar />
                
            </Layout>
            
        </div>
        
     );
}
 
export default Dashboard;