import { useState } from "react"
import PayMonyHelper from "../utils/PayMonyHelper"
import { store } from "../zustand/store"

import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.css'

function PayMony() {

    const { sendedCard } = store(state => state)
    const { bankCode } = store(state => state)
    const { payAmountMonyHandle } = store(state => state)

    const [desCardNum, setDesCardNum] = useState('')
    const [desCardImg, setDesCardImg] = useState('')
    const [desCardAmount, setDesCardAmount] = useState('')
    const [passCard, setPassCard] = useState('')


    const desCardImgHandler = (e) => {
        if (e.target.value.length == 0 && e.which == 48) {
            e.preventDefault()
        } else if (e.target.value.length == 0 && e.which == 96) {
            e.preventDefault()
        }
        if (e.which !== 39 && e.which !== 37 && e.which !== 8 && e.which !== 46 && e.which !== 9 && e.which < 48 || e.which < 96 && e.which > 57 || e.which > 105) {
            e.preventDefault()
        }
    }

    const desCardNumberHandler = (e) => {

        const codeBank = e.target.value[0] + e.target.value[1] + e.target.value[2] + e.target.value[3]
        const findBank = bankCode.find((code) => codeBank == code.code)
        if (findBank) {
            bankCode.map((bank) => {
                if (bank.code == codeBank) {
                    setDesCardImg(bank.url)
                }
            })
        } else {
            setDesCardImg(null)
        }

        setDesCardNum(e.target.value)
    }

    const desCardAmountHandler = (e) => {
        setDesCardAmount(e.target.value)
    }


    const passCardHandler = (e) => {
        setPassCard(e.target.value)
    }


    const submitHandler = (e) => {
        e.preventDefault()

        if (desCardNum.length == 16 && desCardImg && passCard.length > 5 ) {
            e.target[2].value = ''
            e.target[3].value = ''
            e.target[4].value = ''
            setDesCardNum('')
            setDesCardImg('')
            setDesCardAmount('')
            setPassCard('')
        }
    }


    const now = new Date();

    const options = { timeZone: "Asia/Tehran" };

    const formattedDate = now.toLocaleDateString("fa-IR", {
        ...options,
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    });

    
    const payMonyHandler = (e) => {
        const newAmount = sendedCard.amountCard - desCardAmount
        if (desCardNum.length == 16 && desCardImg && passCard.length > 5 && newAmount > -1) {
            const payCardObj = {
                desCardNum: desCardNum,
                desCardImg: desCardImg,
                desCardAmount: desCardAmount,
                sendedCardId: sendedCard.id,
                sendedCardImg: sendedCard.imgCard,
                sendedCardNumber: sendedCard.showNumberCard,
                newAmount: newAmount,
                payTime: formattedDate,
            }
            payAmountMonyHandle(payCardObj)
        } else {
            function pushNotify() {
                new Notify({
                    status: 'error',
                    title: 'Please Fill All Inputs',
                    text: 'Check Them',
                })
            }
            pushNotify()
        }
    }

    let showNumberCard
    if (sendedCard) { showNumberCard = sendedCard.showNumberCard.match(/.{1,4}/g).join(' ') }
    return (
        sendedCard ? <div>
            <form action="" onSubmit={submitHandler}>
                <input type="text" readOnly value={sendedCard.nameCard} className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white" />
                <div className="flex justify-center items-center mb-4 relative"><img className="w-8 absolute right-2 rounded-full" src={sendedCard.imgCard} alt="" /><input type="text" readOnly value={showNumberCard} className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 text-white" /></div>
                <div className="flex justify-center items-center mb-4 relative"><img className="w-8 absolute right-2 rounded-full" src={desCardImg} alt="" /><input type="text" onChange={desCardNumberHandler} onKeyDown={desCardImgHandler} placeholder="Destination Card Number" maxLength={16} className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 text-white" /></div>
                <input type="password" onChange={passCardHandler} placeholder="Password" maxLength={10} className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white" />
                <input type="text" onChange={desCardAmountHandler} onKeyDown={desCardImgHandler} placeholder="Destination Amount" maxLength={10} className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white" />
                <button onClick={payMonyHandler} className="w-full h-10 bg-yellow-300 rounded-md">Add Card</button>
            </form>
        </div> : <PayMonyHelper />
    )
}

export default PayMony
