import { store } from "../zustand/store";
import cardIcon from './kindpng_6039982.png'


function ShowCard() {

    const { bankCard } = store(state => state)
    const { bankCode } = store(state => state)
    const { setCardToPay } = store(state => state)


    const setCardHandler = (cardId) => {

        bankCard.map((bank) => {
            if (bank.id == cardId) {
                setCardToPay(bank)
            }
        })
    }

    const showCards = bankCard.map((card) => {
        const codeBank = card.numberCard[0] + card.numberCard[1] + card.numberCard[2] + card.numberCard[3]
        let bgColor
        bankCode.map((card) => {
            if (codeBank == card.code) {
                bgColor = card.bg.backgroundColor
            }
        })
        const NumCard = card.showNumberCard.match(/.{1,4}/g);
        return (
            <div onClick={() => setCardHandler(card.id)} key={`container${card.id}`} style={{ backgroundColor: bgColor }} className="w-4/5 h-[90%] rounded-md p-3 text-white mx-auto mt-3">
                <div className="flex justify-between items-center mb-1">
                    <img className="rounded-full w-10" src={card.imgCard} alt="Bank Icon" />
                    <img className="w-10" src={cardIcon} alt="Bank Icon" />
                </div>
                <div className="flex gap-3 mb-1">
                    <div className="font-semibold">Card Name:</div>
                    <div>{card.nameCard}</div>
                </div>
                <div className="font-semibold">Card Number:</div>
                <div>{NumCard.join(' ')}</div>
                <div className="flex gap-3 mb-1">
                    <div className="font-semibold">Cvv 2:</div>
                    <div>{card.cvvCard}</div>
                </div>
                <div className="flex gap-3 mb-1">
                    <div className="font-semibold">Expiry Date:</div>
                    <div className="flex gap-2">
                        <div>{card.yearCard}</div>
                        <div>/</div>
                        <div>{card.monthCard}</div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="font-semibold">Amount: </div>
                    <div>$ {card.amountCard}</div>
                </div>
            </div>
        )
    })


    return (
        bankCard.length == 0 ? <div className="w-4/5 h-[90%] rounded-md p-3  mx-auto mt-3 bg-white flex justify-between items-center flex-col">
            <img className="w-10 self-end " src={cardIcon} alt="" /> 
            <p className="text-5xl font-semibold shadow-sm drop-shadow-2xl mb-4">No Card</p>
            <div></div>
        </div> : <div>{showCards}</div>
    )

}

export default ShowCard