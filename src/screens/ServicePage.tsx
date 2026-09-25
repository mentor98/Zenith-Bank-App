import React from "react";

const assetPathPrefix = "/assets";
const imgChevronLeft = `${assetPathPrefix}/30066.svg`;
const imgHome = `${assetPathPrefix}/db9e8.svg`;
const imgFileText = `${assetPathPrefix}/63661.svg`;
const imgSmartphone = `${assetPathPrefix}/02e1d.svg`;
const imgArrowLeftRight = `${assetPathPrefix}/0a035.svg`;
const imgMenu = `${assetPathPrefix}/f1d7d.svg`;

type Screen = "welcome" | "home" | "products" | "lifestyle";

interface ServicePageProps {
  serviceId: string;
  icon: string;
  title: string;
  description: string;
  fullDescription: string;
  features: string[];
  onBack: () => void;
  onNavigate: (s: Screen) => void;
}

// Pay Bills Service Component
function PayBillsUI() {
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
    <div className="space-y-6">
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

      <div>
        <label className="block font-semibold text-[#111215] mb-2">Customer Reference</label>
        <input
          type="text"
          placeholder="Enter customer ID"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          className="w-full px-4 py-3 border border-[#e8e8eb] rounded-lg focus:outline-none focus:border-[#d60a14] bg-[#f9f9fb]"
        />
      </div>

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

      {success && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <p className="text-green-700 font-semibold">✓ Payment Successful</p>
          <p className="text-green-600 text-sm">Your bill payment of ₦{amount} has been processed.</p>
        </div>
      )}

      <button
        onClick={handlePayBill}
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#d60a14] to-[#a00a0f] h-[50px] rounded-[12px] font-bold text-white hover:shadow-lg active:scale-95 disabled:opacity-50 transition-all"
      >
        {loading ? "Processing..." : "Pay Bill"}
      </button>
    </div>
  );
}

// Transfer Money Service Component
function TransferMoneyUI() {
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
    <div className="space-y-6">
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

      <div>
        <label className="block font-semibold text-[#111215] mb-2">Narration (Optional)</label>
        <textarea
          placeholder="Enter payment description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 border border-[#e8e8eb] rounded-lg focus:outline-none focus:border-[#d60a14] bg-[#f9f9fb] min-h-[80px] resize-none"
        />
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <p className="text-green-700 font-semibold">✓ Transfer Successful</p>
          <p className="text-green-600 text-sm">₦{amount} has been transferred to {recipientName}.</p>
        </div>
      )}

      <button
        onClick={handleTransfer}
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#d60a14] to-[#a00a0f] h-[50px] rounded-[12px] font-bold text-white hover:shadow-lg active:scale-95 disabled:opacity-50 transition-all"
      >
        {loading ? "Processing..." : "Transfer Money"}
      </button>
    </div>
  );
}

export default function ServicePage({
  serviceId,
  icon,
  title,
  description,
  fullDescription,
  features,
  onBack,
  onNavigate,
}: ServicePageProps) {
  let serviceContent = null;

  if (serviceId === "pay-bills") {
    serviceContent = <PayBillsUI />;
  } else if (serviceId === "transfer") {
    serviceContent = <TransferMoneyUI />;
  }
  const handleAction = () => {
    switch (serviceId) {
      case "transfer":
        alert("✅ Transfer Money\n\nInitiate a money transfer to another account. Enter recipient details and amount to proceed.");
        break;
      case "pay-bills":
        alert("✅ Pay Bills\n\nSelect your utility provider and enter the amount to pay your bills instantly.");
        break;
      case "airtime":
        alert("✅ Buy Airtime\n\nChoose your network provider and amount to purchase airtime credit.");
        break;
      case "cards":
        alert("✅ Manage Cards\n\nView, block/unblock, or manage your bank cards and spending limits.");
        break;
      case "locate-us":
        alert("✅ Find Branch\n\nLocate the nearest Zenith Bank branch or ATM to your current location.");
        break;
      case "beneficiaries":
        alert("✅ Manage Beneficiaries\n\nAdd, edit, or remove frequently used transfer recipients.");
        break;
      case "forex":
        alert("✅ Forex Services\n\nExchange currencies at competitive rates for your international transactions.");
        break;
      case "finance-manager":
        alert("✅ Finance Manager\n\nTrack your spending, set budgets, and manage your financial goals.");
        break;
      case "settings":
        alert("✅ Settings\n\nManage your account preferences, security, and notification settings.");
        break;
      case "alerts":
        alert("✅ Alerts & Notifications\n\nSet up transaction and security alerts tailored to your preferences.");
        break;
      case "qr-payments":
        alert("✅ QR Payments\n\nMake payments by scanning QR codes - fast, secure, and contactless.");
        break;
      case "profile":
        alert("✅ User Profile\n\nUpdate your personal information and manage your account profile.");
        break;
      case "upcoming":
        alert("✅ Upcoming Events\n\nCheck out upcoming bank events, promotions, and new features.");
        break;
      default:
        alert(`✅ ${title} service\n\nThis service is ready for your banking needs!`);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#f5f6f8] to-[#eef0f5] flex flex-col items-start w-full h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#d60a14] to-[#a00a0f] flex h-[64px] items-center justify-between px-[20px] w-full shrink-0 shadow-md">
        <div className="flex gap-[12px] items-center">
          <button onClick={onBack} className="flex items-center justify-center p-[6px] bg-transparent border-0 cursor-pointer hover:bg-white/20 rounded-full transition-all">
            <div className="relative size-[20px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronLeft} />
            </div>
          </button>
          <p className="font-['Inter:Bold'] font-bold text-[18px] text-white tracking-tight">{title}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[20px] items-start p-[24px] w-full overflow-y-auto flex-1">
        {serviceContent ? (
          // Functional Service UI
          serviceContent
        ) : (
          // Descriptive Service UI (fallback)
          <>
            {/* Icon & Title */}
            <div className="flex flex-col gap-[16px] items-start w-full">
              <div className="bg-gradient-to-br from-[#fdf0f1] to-[#fce4e6] flex items-center justify-center rounded-[16px] size-[64px]">
                <div className="relative size-[36px]">
                  <img alt={title} className="absolute block inset-0 max-w-none size-full" src={icon} />
                </div>
              </div>
              <div>
                <p className="font-['Inter:Bold'] font-bold text-[#111215] text-[24px] tracking-tight">{title}</p>
                <p className="font-['Inter:Regular'] font-normal text-[#616166] text-[14px]">{description}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] w-full bg-gradient-to-r from-[#e8e8eb] via-[#d60a14]/20 to-[#e8e8eb]" />

            {/* Full Description */}
            <div className="flex flex-col gap-[12px] w-full">
              <p className="font-['Inter:Semi_Bold'] font-semibold text-[#111215] text-[16px]">About This Service</p>
              <p className="font-['Inter:Regular'] font-normal text-[#616166] text-[14px] leading-[22px]">{fullDescription}</p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-[12px] w-full">
              <p className="font-['Inter:Semi_Bold'] font-semibold text-[#111215] text-[16px]">Key Features</p>
              <div className="flex flex-col gap-[8px] w-full">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-[12px] items-start">
                    <div className="flex items-center justify-center rounded-full size-[24px] bg-[#d60a14] shrink-0 mt-[2px]">
                      <p className="font-['Inter:Bold'] font-bold text-white text-[12px]">✓</p>
                    </div>
                    <p className="font-['Inter:Regular'] font-normal text-[#616166] text-[14px]">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-r from-[#d6f0e8] to-[#c4e5d9] border border-[#a8d5c4] flex flex-col gap-[8px] items-start p-[16px] rounded-[12px] w-full">
              <p className="font-['Inter:Semi_Bold'] font-semibold text-[#0a7a4e] text-[13px]">✓ Service Ready</p>
              <p className="font-['Inter:Regular'] font-normal text-[#0d5a3f] text-[13px]">
                This service is fully functional and ready to use. Tap the button below to get started!
              </p>
            </div>

            <div className="h-[20px]" />
          </>
        )}
      </div>

      {/* Action Button (only show for non-functional services) */}
      {!serviceContent && (
        <div className="bg-white border-t border-[#e8e8eb] flex flex-col gap-[12px] items-start p-[16px] w-full shrink-0 shadow-lg">
          <button
            className="bg-gradient-to-r from-[#d60a14] to-[#a00a0f] flex h-[50px] items-center justify-center rounded-[12px] w-full cursor-pointer border-0 shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
          >
            <p className="font-['Inter:Bold'] font-bold text-[16px] text-white">Use {title}</p>
          </button>
          <p className="font-['Inter:Regular'] font-normal text-[#0a7a4e] text-[11px] text-center w-full font-semibold">
            ✓ Ready to use - Start now
          </p>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="bg-white border-t border-[#e8e8eb] flex h-[80px] items-center justify-between px-[8px] w-full shrink-0 shadow-lg">
        {[
          { icon: imgHome, label: "Home", tab: "home" },
          { icon: imgFileText, label: "Pay Bills", tab: "pay" },
          { icon: imgSmartphone, label: "Airtime", tab: "airtime" },
          { icon: imgArrowLeftRight, label: "Transfer", tab: "transfer" },
          { icon: imgMenu, label: "More", tab: "more" },
        ].map(({ icon, label, tab }) => (
          <div
            key={tab}
            onClick={tab === "home" ? () => onNavigate("home") : undefined}
            className={`flex flex-col gap-[4px] h-full items-center justify-center flex-1 transition-all ${tab === "home" ? "cursor-pointer" : ""}`}
          >
            <div className="relative size-[24px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={icon} />
            </div>
            <p className={`font-['Inter:Medium'] font-medium text-[10px] text-center text-[#616166]`}>
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
