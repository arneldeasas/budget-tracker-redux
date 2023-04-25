import Image from "next/image"

const AllTransactions = ({userData,month,daySearched}) => {

   
    const days = new Set([...userData.calendar.filter(calendar=>calendar.month===month)[0].expenses.map(expense=>expense.day)])
    const monthTransactions = userData.calendar.filter(calendar=>calendar.month===month)[0]
    const dayArray = [...days]
    const filteredDays = monthTransactions.expenses.filter(expense=>expense.day.toString().includes(daySearched.toString())).map(expense=>expense.day)
    const filteredDaysArray = [...new Set([...filteredDays])]
    console.log(filteredDaysArray[0])
    return ( 
        <div className="h-[100vh] overflow-y-auto overflow-clip pt-0 p-5 pb-[200px] text-black/80">
            
            {daySearched.length === 0 && dayArray.map(day=>(
                <div className=" w-full h-fit">
                    <div>{month} {day}</div>
                    <div className="flex flex-col p-5 gap-3">
                        {monthTransactions.expenses.filter(expense=> expense.day === day).map(expense=>(
                            <div key={expense.id} id={expense.id} className="transaction-item">
                                <div className="bg-[#aad8db] rounded-lg w-[40px] h-[40px] p-2">
                                    {expense.type === 'food' &&<Image src='/icons/food-icon.png' alt='food-icon' width={25} height={25}/>}
                                    {expense.type === 'school' && <Image src='/icons/school.png' alt='food-icon' width={25} height={25}/>}
                                    {expense.type === 'entertainment' && <Image src='/icons/entertainment.svg' alt='food-icon' width={25} height={25}/>}
                                    {expense.type === 'health' && <Image src='/icons/health.png' alt='food-icon' width={25} height={25}/>}
                                    {expense.type === 'transport' && <Image src='/icons/transport.png' alt='food-icon' width={25} height={25}/>}
                                    {expense.type === 'others' && <Image src='/icons/others.png' alt='food-icon' width={25} height={25}/>}
                                </div>
                                <div className="overflow-hidden mx-2 w-[60%]">
                                    <h2 className="text-[14px] font-semibold">{expense.type}</h2>
                                    <h3 className="text-[12px] overflow-ellipsis whitespace-nowrap overflow-hidden ">{expense.description} </h3>
                                </div>
                                <div>
                                    <h2 className="text-[14px] font-semibold text-[#f67659] text-right">-₱{expense.price}</h2>
                                    <h3 className="text-[12px] ">{expense.time}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {daySearched.length > 0 && filteredDaysArray.map(day=>(
                <div className=" w-full h-fit">
                    <div>{month} {day}</div>
                    <div className="flex flex-col p-5 gap-3">
                        {monthTransactions.expenses.filter(expense=> expense.day === day).map(expense=>(
                            <div key={expense.id} id={expense.id} className="transaction-item">
                                <div className="bg-[#aad8db] rounded-lg w-[40px] h-[40px] p-2">
                                    {expense.type === 'food' &&<Image src='/icons/food-icon.png' alt='food-icon' width={25} height={25}/>}
                                    {expense.type === 'school' && <Image src='/icons/school.png' alt='food-icon' width={25} height={25}/>}
                                    {expense.type === 'entertainment' && <Image src='/icons/entertainment.svg' alt='food-icon' width={25} height={25}/>}
                                    {expense.type === 'health' && <Image src='/icons/health.png' alt='food-icon' width={25} height={25}/>}
                                    {expense.type === 'transport' && <Image src='/icons/transport.png' alt='food-icon' width={25} height={25}/>}
                                    {expense.type === 'others' && <Image src='/icons/others.png' alt='food-icon' width={25} height={25}/>}
                                </div>
                                <div className="overflow-hidden mx-2 w-[60%]">
                                    <h2 className="text-[14px] font-semibold">{expense.type}</h2>
                                    <h3 className="text-[12px] overflow-ellipsis whitespace-nowrap overflow-hidden ">{expense.description} </h3>
                                </div>
                                <div>
                                    <h2 className="text-[14px] font-semibold text-[#f67659] text-right">-₱{expense.price}</h2>
                                    <h3 className="text-[12px] ">{expense.time}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            
        </div>
     );
}
 
export default AllTransactions;