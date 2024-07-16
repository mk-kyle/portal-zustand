
function PayMonyHelper() {
    return (
        <div>
            <input type="text" readOnly placeholder='Card Namne' className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white" />
            <input type="text" readOnly placeholder='Card Number'  className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white" />
            <input type="text" readOnly placeholder="Destination Card Number" maxLength={16} className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white" />
            <input type="password" readOnly placeholder="Password" maxLength={10} className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white" />
            <input type="text" readOnly placeholder="Destination Amount" maxLength={10} className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white" />
            <button className="w-full h-10 bg-yellow-300 rounded-md">Add Card</button>
        </div>
    )
}

export default PayMonyHelper