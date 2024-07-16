import { useState } from "react"
import { store } from "../zustand/store"

function AddCard() {

    const [nameCard, setNameCard] = useState('')
    const [numberCard, setnumberCard] = useState('')
    const [cvvCard, setCvvCard] = useState('')
    const [yearCard, setyearCard] = useState('')
    const [monthCard, setMounthCard] = useState('')
    const [amountCard, setAmountCard] = useState('')
    const [imgCard, setImgCard] = useState(null)


    const { addNewCard } = store(state => state)
    const { bankCode } = store(state => state)
    


    const nameHandler = (e) => {
        if (e.which !== 39 && e.which !== 37 && e.which !== 8 && e.which !== 46 && e.which !== 9 && e.which < 65 || e.which > 90) {
            e.preventDefault()
        }
    }

    const cardNumberHandler = (e) => {
        if (e.target.value.length == 0 && e.which == 48) {
            e.preventDefault()
        } else if (e.target.value.length == 0 && e.which == 96) {
            e.preventDefault()
        }
        if (e.which !== 39 && e.which !== 37 && e.which !== 8 && e.which !== 46 && e.which !== 9 && e.which < 48 || e.which < 96 && e.which > 57 || e.which > 105) {
            e.preventDefault()
        }
    }

    const numberHandler = (e) => {
        if (e.which !== 39 && e.which !== 37 && e.which !== 8 && e.which !== 46 && e.which !== 9 && e.which < 48 || e.which < 96 && e.which > 57 || e.which > 105) {
            e.preventDefault()
        }
    }

    const nameValueHandler = (e) => {
        setNameCard(e.target.value)
    }

    const numberValueHandler = (e) => {
        const codeBank = e.target.value[0] + e.target.value[1] + e.target.value[2] + e.target.value[3]
        const findBank = bankCode.find((code) => codeBank == code.code)
        if (findBank) {
            bankCode.map((bank) => {
                if (bank.code == codeBank) {
                    setImgCard(bank.url)
                }
            })
        } else {
            setImgCard(null)
        }
        setnumberCard(e.target.value)
    }

    const cvvValueHandler = (e) => {
        setCvvCard(e.target.value)
    }

    const yearValueHandler = (e) => {
        if (e.target.value == '00') {
            e.target.value = ''
        }
        setyearCard(e.target.value)
    }

    const montValueHandler = (e) => {
        if (e.target.value == '00') {
            e.target.value = ''
        }
        setMounthCard(e.target.value)
    }

    const dateYearHandler = (e) => {
        if (e.target.value < 10 && e.target.value.length == 1) {
            e.target.value = 0 + e.target.value
        } else if (e.target.value > 12) {
            e.target.value = 12
        }
        if (e.target.value == 0) {
            e.target.value = ''
        }
        setyearCard(e.target.value)
    }

    const dateMonthHandler = (e) => {
        if (e.target.value < 10 && e.target.value.length == 1) {
            e.target.value = 0 + e.target.value
        } else if (e.target.value > 12) {
            e.target.value = 12
        }
        if (e.target.value == 0) {
            e.target.value = ''
        }
        setMounthCard(e.target.value)
    }

    const amountValueHandler = (e) => {
        setAmountCard(e.target.value)
    }

    const addCardHandler = (e) => {
        e.preventDefault()
        if (cardObj.isFill) {
            e.target[0].value = ''
            e.target[1].value = ''
            e.target[2].value = ''
            e.target[3].value = ''
            e.target[4].value = ''
            e.target[5].value = ''
            setNameCard('')
            setnumberCard('')
            setCvvCard('')
            setyearCard('')
            setMounthCard('')
            setAmountCard('')
            setImgCard(null)
        }
    }
    
    const cardObj = {
        id: Math.random() * 100 ,
        nameCard: nameCard,
        numberCard: numberCard,
        showNumberCard: numberCard,
        cvvCard: cvvCard,
        yearCard: yearCard,
        monthCard: monthCard,
        amountCard: amountCard,
        imgCard: imgCard,
        isFill: amountCard.length > 3 && cvvCard.length > 2 && nameCard.length > 2 && numberCard.length == 16 && yearCard.length && monthCard.length && imgCard ? true : false
    }



    return (
        <div>
            <form action="" onSubmit={addCardHandler}>
                <input onChange={nameValueHandler} onKeyDown={nameHandler} maxLength={20} type="text" placeholder="Card Name" className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white" />
                <div className="flex justify-center items-center mb-4 relative"><img className="w-8 absolute right-2 rounded-full" src={imgCard} alt="" /><input onChange={numberValueHandler} onKeyDown={cardNumberHandler} maxLength={16} type="text" placeholder="Card Number" className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 text-white" /></div>
                <input onChange={cvvValueHandler} onKeyDown={cardNumberHandler} maxLength={4} type="text" placeholder="Cvv2" className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white text-center" />
                <div className="flex gap-4">
                    <input onBlur={dateYearHandler} onChange={yearValueHandler} onKeyDown={numberHandler} maxLength={2} type="text" placeholder="Year" className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white text-center" />
                    <input onBlur={dateMonthHandler} onChange={montValueHandler} onKeyDown={numberHandler} maxLength={2} type="text" placeholder="Month" className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white text-center" />
                </div>
                <input onChange={amountValueHandler} onKeyDown={cardNumberHandler} maxLength={10} type="text" placeholder="Amount" className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white" />
                <button onClick={() => addNewCard(cardObj)} className="w-full h-10 bg-yellow-300 rounded-md">Add Card</button>
            </form>
        </div>
    )
}

export default AddCard