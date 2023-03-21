import Image from "next/image";
const Transactions = () => {

    const transactions = [
        {
            "id": 1,
            "day": "10",
            "type": "food",
            "value": "60",
            "time": "12:03 PM"
          },
          {
            "id": 2,
            "day": "10",
            "type": "school",
            "value": "35",
            "time": "3:54 PM"
          },
          {
            "id": 3,
            "day": "12",
            "type": "transport",
            "value": "15",
            "time": "7:05 AM"
          },
          {
            "id": 4,
            "day": "13",
            "type": "food",
            "value": "35",
            "time": "9:53 PM"
          },
          {
            "id": 5,
            "day": "13",
            "type": "health",
            "value": "100",
            "time": "11:19 PM"
          },
          {
            "id": 6,
            "day": "13",
            "type": "school",
            "value": "150",
            "time": "11:32 PM"
          },
          {
            "id": 7,
            "day": "13",
            "type": "entertainment",
            "value": "57",
            "time": "11:33 PM"
          },
          {
            "id": 8,
            "day": "13",
            "type": "food",
            "value": "25",
            "time": "11:33 PM"
          },
          {
            "id": 9,
            "day": "14",
            "type": "food",
            "value": "30",
            "time": "12:32 PM"
          },
          {
            "id": 10,
            "day": "14",
            "type": "school",
            "value": "30",
            "time": "12:33 PM"
          },
          {
            "id": 11,
            "day": "14",
            "type": "transport",
            "value": "12",
            "time": "1:53 PM"
          }
    ]


    return ( 
        <div className="flex flex-col gap-2 " >
            {
                transactions.map(transaction=>
                    (
         
                        <div key={transaction.id} className="transaction-item">
                            <div className="bg-[#aad8db] rounded-lg w-[40px] h-[40px] p-2">
                                <Image src='/icons/food-icon.png' alt='food-icon' width={35} height={35}/>
                            </div>
                            <div>
                                <h2 className="text-[14px] font-semibold">{transaction.type}</h2>
                                <h3 className="text-[12px] ">description...</h3>
                            </div>
                            <div>
                                <h2 className="text-[14px] font-semibold text-[#f67659] text-right">-₱{transaction.value}</h2>
                                <h3 className="text-[12px] ">{transaction.time}</h3>
                            </div>
                        </div>
                        
                    )
                )
            }

            
        </div>
     );
}
 
export default Transactions;