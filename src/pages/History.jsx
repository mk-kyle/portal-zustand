import { store } from "../zustand/store"

function History() {



    const { payedHistory } = store(state => state)
    console.log(payedHistory);

    const showHistory = payedHistory.map((payed) => {
        return (
            <div className="mb-4 p-4 rounded-md border-yellow-200 border-2 text-white bg-[#ffff001b]">
                <div className="flex justify-between items-center mb-4">
                    <img className="w-10 rounded-md" src={payed.sendedCardImg} alt="" />
                    <img className="w-10 rounded-md" src={payed.desCardImg} alt="" />
                </div>
                <div className="flex justify-between items-center mb-4">
                    <div>From: {payed.sendedCardNumber.match(/.{1,4}/g).join(' ')}</div>
                    <div>To: {payed.desCardNum.match(/.{1,4}/g).join(' ')}</div>
                </div>
                <div className="flex justify-between">
                    <div>Amount: $ {payed.desCardAmount}</div>
                    <div>Date: {payed.payTime}</div>
                </div>
            </div>
        )
    })

    return (
        <div>
            {showHistory}
        </div>
    )
}

export default History