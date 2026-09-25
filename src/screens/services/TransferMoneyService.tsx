import React from "react";

interface Props {
  onBack: () => void;
}

const assetPathPrefix = "/assets";
const imgChevronLeft = `${assetPathPrefix}/30066.svg`;

export default function TransferMoneyService({ onBack }: Props) {
  const [recipientName, setRecipientName] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [bank, setBank] = React.useState("ZENITH");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleTransfer = async () => {
    if (!recipientName || !accountNumber || !amount) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      // Simulate transfer processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setRecipientName("");
        setAccountNumber("");
        setAmount("");
        setDescription("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex flex-col items-start w-full h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#d60a14] to-[#a00a0f] flex h-[64px] items-center justify-between px-[20px] w-full shrink-0 shadow-md">
        <div className="flex gap-[12px] items-center">
          <button onClick={onBack} className="flex items-center justify-center p-[6px] bg-transparent border-0 cursor-pointer hover:bg-white/20 rounded-full transition-all">
            <div className="relative size-[20px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronLeft} />
            </div>
          </button>
          <p className="font-['Inter:Bold'] font-bold text-[18px] text-white tracking-tight">Transfer Money</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto w-full p-[24px]">
        <div className="space-y-6">
          {/* Recipient Name */}
          <div>
            <label className="block font-semibold text-[#111215] mb-2">Recipient Name</label>
            <input
              type="text"
              placeholder="Enter recipient's name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full px-4 py-3 border border-[#e8e8eb] rounded-lg focus:outline-none focus:border-[#d60a14] bg-[#f9f9fb]"
            />
          </div>

          {/* Bank */}
          <div>
            <label className="block font-semibold text-[#111215] mb-2">Bank</label>
            <select
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-full px-4 py-3 border border-[#e8e8eb] rounded-lg focus:outline-none focus:border-[#d60a14] bg-[#f9f9fb]"
            >
              <option value="ZENITH">Zenith Bank</option>
              <option value="GTB">Guaranty Trust Bank</option>
              <option value="ACCESS">Access Bank</option>
              <option value="UBA">United Bank for Africa</option>
              <option value="FCMB">FCMB</option>
            </select>
          </div>

          {/* Account Number */}
          <div>
            <label className="block font-semibold text-[#111215] mb-2">Account Number</label>
            <input
              type="text"
              placeholder="10 digits account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              maxLength={10}
              className="w-full px-4 py-3 border border-[#e8e8eb] rounded-lg focus:outline-none focus:border-[#d60a14] bg-[#f9f9fb]"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block font-semibold text-[#111215] mb-2">Amount (₦)</label>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-[#e8e8eb] rounded-lg focus:outline-none focus:border-[#d60a14] bg-[#f9f9fb]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-[#111215] mb-2">Narration (Optional)</label>
            <textarea
              placeholder="Enter payment description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-[#e8e8eb] rounded-lg focus:outline-none focus:border-[#d60a14] bg-[#f9f9fb] min-h-[80px] resize-none"
            />
          </div>

          {/* Info Box */}
          {success && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <p className="text-green-700 font-semibold">✓ Transfer Successful</p>
              <p className="text-green-600 text-sm">₦{amount} has been transferred to {recipientName}.</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="bg-white border-t border-[#e8e8eb] p-[16px] w-full shrink-0">
        <button
          onClick={handleTransfer}
          disabled={loading}
          className="bg-gradient-to-r from-[#d60a14] to-[#a00a0f] flex h-[50px] items-center justify-center rounded-[12px] w-full cursor-pointer border-0 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 transition-all duration-200 font-bold text-white"
        >
          {loading ? "Processing..." : "Transfer Money"}
        </button>
      </div>
    </div>
  );
}
