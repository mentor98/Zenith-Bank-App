import React from "react";

interface Props {
  onBack: () => void;
}

const assetPathPrefix = "/assets";
const imgChevronLeft = `${assetPathPrefix}/30066.svg`;

export default function PayBillsService({ onBack }: Props) {
  const [billType, setBillType] = React.useState("electricity");
  const [amount, setAmount] = React.useState("");
  const [provider, setProvider] = React.useState("NEPA");
  const [reference, setReference] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const billProviders: Record<string, string[]> = {
    electricity: ["NEPA", "Ikeja Electric", "Eko Electric"],
    water: ["LASU", "WASCON", "PHCN Water"],
    internet: ["AIRTEL", "MTN", "GLO", "9MOBILE"],
    mobile: ["AIRTEL", "MTN", "GLO", "9MOBILE"]
  };

  const handlePayBill = async () => {
    if (!amount || !reference) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setAmount("");
        setReference("");
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
          <p className="font-['Inter:Bold'] font-bold text-[18px] text-white tracking-tight">Pay Bills</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto w-full p-[24px]">
        <div className="space-y-6">
          {/* Bill Type */}
          <div>
            <label className="block font-semibold text-[#111215] mb-2">Bill Type</label>
            <select
              value={billType}
              onChange={(e) => {
                setBillType(e.target.value);
                setProvider(billProviders[e.target.value][0]);
              }}
              className="w-full px-4 py-3 border border-[#e8e8eb] rounded-lg focus:outline-none focus:border-[#d60a14] bg-[#f9f9fb]"
            >
              <option value="electricity">Electricity</option>
              <option value="water">Water</option>
              <option value="internet">Internet</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>

          {/* Provider */}
          <div>
            <label className="block font-semibold text-[#111215] mb-2">Provider</label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full px-4 py-3 border border-[#e8e8eb] rounded-lg focus:outline-none focus:border-[#d60a14] bg-[#f9f9fb]"
            >
              {billProviders[billType]?.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Customer Reference */}
          <div>
            <label className="block font-semibold text-[#111215] mb-2">Customer Reference</label>
            <input
              type="text"
              placeholder="Enter customer ID or reference number"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
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

          {/* Info Box */}
          {success && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <p className="text-green-700 font-semibold">✓ Payment Successful</p>
              <p className="text-green-600 text-sm">Your bill payment of ₦{amount} has been processed.</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="bg-white border-t border-[#e8e8eb] p-[16px] w-full shrink-0">
        <button
          onClick={handlePayBill}
          disabled={loading}
          className="bg-gradient-to-r from-[#d60a14] to-[#a00a0f] flex h-[50px] items-center justify-center rounded-[12px] w-full cursor-pointer border-0 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 transition-all duration-200 font-bold text-white"
        >
          {loading ? "Processing..." : "Pay Bill"}
        </button>
      </div>
    </div>
  );
}
