import Link from "next/link";

const Navbar = ({month}) => {
    return ( 
        <nav className='bg-blue-400 flex justify-around py-3 text-3xl text-white w-full'>
            <Link href={'/dashboard/'+month}><i className="fa-solid fa-house"></i></Link>
            <Link href={`/dashboard/${month}/report`}><i className="fa-solid fa-chart-simple"></i></Link>
            <a><i class="fa-solid fa-address-card"></i></a>
        </nav>
    );
}
 
export default Navbar;