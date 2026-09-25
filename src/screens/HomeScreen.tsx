const assetPathPrefix = "/assets";
const imgBell = `${assetPathPrefix}/d6100.svg`;
const imgChevronRight = `${assetPathPrefix}/8f986.svg`;
const imgHome = `${assetPathPrefix}/de425.svg`;
const imgReceipt = `${assetPathPrefix}/a6b99.svg`;
const imgSmartphone = `${assetPathPrefix}/cf891.svg`;
const imgArrowLeftRight = `${assetPathPrefix}/95d81.svg`;
const imgCreditCard = `${assetPathPrefix}/d7200.svg`;
const imgMapPin = `${assetPathPrefix}/a3d09.svg`;
const imgUsers = `${assetPathPrefix}/f0880.svg`;
const imgBanknote = `${assetPathPrefix}/fed86.svg`;
const imgPackage = `${assetPathPrefix}/90a0a.svg`;
const imgBarChart3 = `${assetPathPrefix}/ca3c6.svg`;
const imgSparkles = `${assetPathPrefix}/126f9.svg`;
const imgSettings = `${assetPathPrefix}/d1ff4.svg`;
const imgBell1 = `${assetPathPrefix}/76835.svg`;
const imgQrCode = `${assetPathPrefix}/b9893.svg`;
const imgUser = `${assetPathPrefix}/add47.svg`;
const imgCalendar = `${assetPathPrefix}/f2da3.svg`;
const imgHome1 = `${assetPathPrefix}/f146c.svg`;
const imgFileText = `${assetPathPrefix}/63661.svg`;
const imgSmartphone1 = `${assetPathPrefix}/02e1d.svg`;
const imgArrowLeftRight1 = `${assetPathPrefix}/0a035.svg`;
const imgMenu = `${assetPathPrefix}/f1d7d.svg`;
const imgLogout = `${assetPathPrefix}/87899.svg`;

type Screen = "welcome" | "home" | "products" | "lifestyle";

interface ServiceCardProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

function ServiceCard({ icon, label, onClick }: ServiceCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#e8e8eb] flex flex-1 flex-col gap-[8px] h-[100px] items-center justify-center min-w-0 p-[12px] rounded-[16px] transition-all duration-200 ${onClick ? "cursor-pointer hover:border-[#d60a14] hover:shadow-md active:scale-95" : "cursor-not-allowed opacity-60"}  shadow-sm`}
    >
      <div className="bg-gradient-to-br from-[#fdf0f1] to-[#fce4e6] flex items-center justify-center rounded-[12px] size-[40px]">
        <div className="relative size-[20px]">
          <img alt={label} className="absolute block inset-0 max-w-none size-full" src={icon} />
        </div>
      </div>
      <p className="font-['Inter:Semi_Bold'] font-semibold text-[#111215] text-[11px] text-center w-full overflow-hidden text-ellipsis leading-tight">{label}</p>
    </div>
  );
}

interface Props {
  onNavigate: (s: Screen) => void;
  activeTab: string;
  userName: string;
  onLogout: () => void;
  onOpenService: (serviceId: string) => void;
}

export default function HomeScreen({ onNavigate, activeTab, userName, onLogout, onOpenService }: Props) {
  const handleServiceClick = (serviceId: string) => {
    // Open service page instead of alert
    onOpenService(serviceId);
  };

  return (
    <div className="bg-gradient-to-b from-[#f5f6f8] to-[#eef0f5] flex flex-col items-start w-full h-dvh">
      {/* Brand Header */}
      <div className="bg-gradient-to-r from-[#d60a14] to-[#a00a0f] flex h-[72px] items-center justify-between px-[20px] w-full shrink-0 shadow-md">
        <div className="flex gap-[10px] items-center">
          <div className="bg-white flex items-center justify-center rounded-[10px] size-[36px] shadow-sm">
            <p className="font-['Inter:Black'] font-black text-[#d60a14] text-[22px] leading-none">Z</p>
          </div>
          <p className="font-['Inter:Extra_Bold'] font-extrabold text-[18px] text-white tracking-wide">ZENITH BANK</p>
        </div>
        <button
          onClick={onLogout}
          className="flex h-[40px] items-center justify-center rounded-full size-[40px] bg-white/20 hover:bg-white/30 transition-all cursor-pointer"
          title="Logout"
        >
          <div className="relative size-[20px]">
            <img alt="logout" className="absolute block inset-0 max-w-none size-full" src={imgLogout} />
          </div>
        </button>
      </div>

      {/* Welcome Hero */}
      <div className="bg-gradient-to-r from-[#d60a14] via-[#c20810] to-[#8b0510] flex flex-col gap-[8px] items-start p-[24px] w-full shrink-0 shadow-sm">
        <p className="font-['Inter:Medium'] font-medium text-[#ffb3b8] text-[13px] opacity-90">Good morning,</p>
        <p className="font-['Inter:Bold'] font-bold text-[28px] text-white tracking-tight">{userName}</p>
        <p className="font-['Inter:Regular'] font-normal text-[#ffccd0] text-[14px]">Your goals. Our priority.</p>
      </div>

      {/* Services Section */}
      <div className="flex flex-col gap-[16px] items-start p-[16px] w-full overflow-y-auto flex-1">
        <div className="flex items-center justify-between w-full">
          <p className="font-['Inter:Bold'] font-bold text-[#111215] text-[16px] tracking-tight">Our Services</p>
          <div className="flex gap-[4px] items-center cursor-pointer hover:gap-[6px] transition-all">
            <p className="font-['Inter:Semi_Bold'] font-semibold text-[#d60a14] text-[13px]">Customize</p>
            <div className="relative size-[12px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronRight} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[12px] w-full">
          <div className="flex gap-[10px]">
            <ServiceCard icon={imgHome} label="Home" />
            <ServiceCard icon={imgReceipt} label="Pay Bills" onClick={() => handleServiceClick('pay-bills')} />
            <ServiceCard icon={imgSmartphone} label="Airtime" onClick={() => handleServiceClick('airtime')} />
          </div>
          <div className="flex gap-[10px]">
            <ServiceCard icon={imgArrowLeftRight} label="Transfer" onClick={() => handleServiceClick('transfer')} />
            <ServiceCard icon={imgCreditCard} label="Cards" onClick={() => handleServiceClick('cards')} />
            <ServiceCard icon={imgMapPin} label="Locate Us" onClick={() => handleServiceClick('locate-us')} />
          </div>
          <div className="flex gap-[10px]">
            <ServiceCard icon={imgUsers} label="Beneficiaries" onClick={() => handleServiceClick('beneficiaries')} />
            <ServiceCard icon={imgBanknote} label="Forex" onClick={() => handleServiceClick('forex')} />
            <ServiceCard icon={imgPackage} label="Products & Services" onClick={() => onNavigate("products")} />
          </div>
          <div className="flex gap-[10px]">
            <ServiceCard icon={imgBarChart3} label="Finance Manager" onClick={() => handleServiceClick('finance-manager')} />
            <ServiceCard icon={imgSparkles} label="Lifestyle" onClick={() => onNavigate("lifestyle")} />
            <ServiceCard icon={imgSettings} label="Settings" onClick={() => handleServiceClick('settings')} />
          </div>
          <div className="flex gap-[10px]">
            <ServiceCard icon={imgBell1} label="Alerts" onClick={() => handleServiceClick('alerts')} />
            <ServiceCard icon={imgQrCode} label="QR Payments" onClick={() => handleServiceClick('qr-payments')} />
            <ServiceCard icon={imgUser} label="Profile" onClick={() => handleServiceClick('profile')} />
          </div>
          <div className="flex gap-[10px]">
            <ServiceCard icon={imgCalendar} label="Upcoming" onClick={() => handleServiceClick('upcoming')} />
            <div className="flex-1 h-[100px] min-w-0" />
            <div className="flex-1 h-[100px] min-w-0" />
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="bg-white border-t border-[#e8e8eb] flex h-[80px] items-center justify-between px-[8px] w-full shrink-0 shadow-lg">
        {[
          { icon: imgHome1, label: "Home", tab: "home" },
          { icon: imgFileText, label: "Pay Bills", tab: "pay" },
          { icon: imgSmartphone1, label: "Airtime", tab: "airtime" },
          { icon: imgArrowLeftRight1, label: "Transfer", tab: "transfer" },
          { icon: imgMenu, label: "More", tab: "more" },
        ].map(({ icon, label, tab }) => {
          const isActive = activeTab === tab;
          return (
            <div key={tab} className="flex flex-col gap-[4px] h-full items-center justify-center flex-1 cursor-pointer group">
              <div className={`relative size-[24px] transition-all ${isActive ? "scale-110" : "group-hover:scale-105"}`}>
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={icon} />
              </div>
              <p className={`font-['Inter:${isActive ? "Semi_Bold" : "Medium"}'] font-${isActive ? "semibold" : "medium"} text-[10px] text-center ${isActive ? "text-[#d60a14]" : "text-[#616166] group-hover:text-[#111215]"} transition-colors`}>
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
