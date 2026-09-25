const assetPathPrefix = "/assets";
const imgChevronLeft = `${assetPathPrefix}/30066.svg`;
const imgPlusCircle = `${assetPathPrefix}/811ae.svg`;
const imgPercent = `${assetPathPrefix}/59ee3.svg`;
const imgFileCheck = `${assetPathPrefix}/4a1d1.svg`;
const imgLandmark = `${assetPathPrefix}/d237e.svg`;
const imgFileText = `${assetPathPrefix}/aafdc.svg`;
const imgGlobe = `${assetPathPrefix}/2d0b3.svg`;
const imgSliders = `${assetPathPrefix}/c3445.svg`;
const imgChevronRight = `${assetPathPrefix}/8f986.svg`;
const imgArrowUpRight = `${assetPathPrefix}/24d0d.svg`;
const imgArrowDownLeft = `${assetPathPrefix}/5ee2f.svg`;
const imgHome = `${assetPathPrefix}/db9e8.svg`;
const imgFileText1 = `${assetPathPrefix}/63661.svg`;
const imgSmartphone = `${assetPathPrefix}/02e1d.svg`;
const imgArrowLeftRight = `${assetPathPrefix}/0a035.svg`;
const imgMenu = `${assetPathPrefix}/52a70.svg`;

type Screen = "welcome" | "home" | "products" | "lifestyle";

interface ProductCardProps {
  icon: string;
  label: string;
  description: string;
}

function ProductCard({ icon, label, description }: ProductCardProps) {
  return (
    <div className="bg-white border border-[#e8e8eb] flex flex-1 flex-col gap-[8px] h-[120px] items-center justify-center min-w-0 px-[8px] py-[14px] rounded-[16px] transition-all duration-200 cursor-pointer hover:border-[#d60a14] hover:shadow-md active:scale-95 shadow-sm">
      <div className="bg-gradient-to-br from-[#fdf0f1] to-[#fce4e6] flex items-center justify-center rounded-[14px] size-[38px]">
        <div className="relative size-[20px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={icon} />
        </div>
      </div>
      <p className="font-['Inter:Bold'] font-bold text-[#111215] text-[11px] text-center w-full leading-tight">{label}</p>
      <p className="font-['Inter:Regular'] font-normal text-[#616166] text-[8px] text-center w-full overflow-hidden text-ellipsis line-clamp-2">{description}</p>
    </div>
  );
}

interface TransactionProps {
  icon: string;
  iconBg: string;
  title: string;
  date: string;
  amount: string;
  amountColor: string;
}

function Transaction({ icon, iconBg, title, date, amount, amountColor }: TransactionProps) {
  return (
    <div className="bg-white border border-[#e8e8eb] flex items-center justify-between p-[14px] rounded-[14px] w-full transition-all duration-200 hover:border-[#d60a14] hover:shadow-md shadow-sm">
      <div className="flex flex-1 gap-[12px] items-center min-w-0">
        <div className={`${iconBg} flex items-center justify-center rounded-[20px] size-[40px] shrink-0`}>
          <div className="relative size-[18px]">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={icon} />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-[2px] items-start min-w-0">
          <p className="font-['Inter:Semi_Bold'] font-semibold text-[#111215] text-[13px] w-full overflow-hidden text-ellipsis whitespace-nowrap">{title}</p>
          <p className="font-['Inter:Regular'] font-normal text-[#616166] text-[11px]">{date}</p>
        </div>
      </div>
      <p className={`font-['Inter:Bold'] font-bold ${amountColor} text-[14px] text-right whitespace-nowrap ml-2`}>{amount}</p>
    </div>
  );
}

interface Props {
  onBack: () => void;
  onNavigate: (s: Screen) => void;
}

export default function ProductsServicesScreen({ onBack, onNavigate }: Props) {
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
          <p className="font-['Inter:Bold'] font-bold text-[18px] text-white tracking-tight">Products &amp; Services</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex flex-col gap-[14px] items-start p-[16px] w-full shrink-0">
        <div className="flex gap-[12px] w-full">
          <ProductCard icon={imgPlusCircle} label="Open Account" description="Open additional accounts in minutes" />
          <ProductCard icon={imgPercent} label="Request Loan" description="Get the fundings you need, faster" />
          <ProductCard icon={imgFileCheck} label="Cheques" description="Order and manage your cheque books" />
        </div>
        <div className="flex gap-[12px] w-full">
          <ProductCard icon={imgLandmark} label="Bank Draft" description="Draft payments requests made simple" />
          <ProductCard icon={imgFileText} label="Statements" description="Download official statements" />
          <ProductCard icon={imgGlobe} label="Dubai Visa" description="Seamlessly apply for travel visas" />
        </div>
        <div className="flex gap-[12px] w-full">
          <ProductCard icon={imgSliders} label="Transfer Limits" description="Set and update your limits" />
          <div className="flex-1 h-[120px] min-w-0" />
          <div className="flex-1 h-[120px] min-w-0" />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="flex flex-col gap-[14px] items-start pb-[20px] px-[16px] w-full overflow-y-auto flex-1">
        <div className="flex items-center justify-between w-full">
          <p className="font-['Inter:Bold'] font-bold text-[#111215] text-[16px] tracking-tight">Recent Activities</p>
          <div className="flex gap-[4px] items-center cursor-pointer hover:gap-[6px] transition-all">
            <p className="font-['Inter:Semi_Bold'] font-semibold text-[#d60a14] text-[13px]">View All</p>
            <div className="relative size-[12px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronRight} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] w-full">
          <Transaction
            icon={imgArrowUpRight}
            iconBg="bg-gradient-to-br from-[#fdf0f1] to-[#fce4e6]"
            title="Transfer to John Doe"
            date="Aug 19, 2023 • 10:24 AM"
            amount="-₦50,000.00"
            amountColor="text-[#d60a14]"
          />
          <Transaction
            icon={imgArrowUpRight}
            iconBg="bg-gradient-to-br from-[#fdf0f1] to-[#fce4e6]"
            title="Airtime Purchase"
            date="Aug 19, 2023 • 8:15 PM"
            amount="-₦2,000.00"
            amountColor="text-[#d60a14]"
          />
          <Transaction
            icon={imgArrowDownLeft}
            iconBg="bg-gradient-to-br from-[#e6f6ed] to-[#d4f1e1]"
            title="Salary Credit"
            date="Aug 16, 2023 • 4:10 PM"
            amount="+₦250,000.00"
            amountColor="text-[#0f9f59]"
          />
        </div>
      </div>

      <div className="h-[16px] w-full shrink-0" />

      {/* Bottom Nav */}
      <div className="bg-white border-t border-[#e8e8eb] flex h-[80px] items-center justify-between px-[8px] w-full shrink-0 shadow-lg">
        {[
          { icon: imgHome, label: "Home", tab: "home" },
          { icon: imgFileText1, label: "Pay Bills", tab: "pay" },
          { icon: imgSmartphone, label: "Airtime", tab: "airtime" },
          { icon: imgArrowLeftRight, label: "Transfer", tab: "transfer" },
          { icon: imgMenu, label: "More", tab: "more", active: true },
        ].map(({ icon, label, tab, active }) => (
          <div
            key={tab}
            onClick={tab === "home" ? () => onNavigate("home") : undefined}
            className={`flex flex-col gap-[4px] h-full items-center justify-center flex-1 transition-all ${tab === "home" ? "cursor-pointer" : ""}`}
          >
            <div className={`relative size-[24px] transition-all ${active ? "scale-110" : ""}`}>
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={icon} />
            </div>
            <p className={`font-['Inter:${active ? "Semi_Bold" : "Medium"}'] font-${active ? "semibold" : "medium"} text-[10px] text-center ${active ? "text-[#d60a14]" : "text-[#616166]"}`}>
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
