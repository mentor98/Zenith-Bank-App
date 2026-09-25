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
  const handleAction = () => {
    alert(`✅ ${title} action - Coming Soon!\nPlease connect your backend to enable this service.`);
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
        <div className="bg-gradient-to-r from-[#fdf0f1] to-[#fce4e6] border border-[#f5d4d7] flex flex-col gap-[8px] items-start p-[16px] rounded-[12px] w-full">
          <p className="font-['Inter:Semi_Bold'] font-semibold text-[#d60a14] text-[13px]">💡 Pro Tip</p>
          <p className="font-['Inter:Regular'] font-normal text-[#616166] text-[13px]">
            This service is ready for integration. Connect your backend to enable real functionality.
          </p>
        </div>

        <div className="h-[20px]" />
      </div>

      {/* Action Button */}
      <div className="bg-white border-t border-[#e8e8eb] flex flex-col gap-[12px] items-start p-[16px] w-full shrink-0 shadow-lg">
        <button
          onClick={handleAction}
          className="bg-gradient-to-r from-[#d60a14] to-[#a00a0f] flex h-[50px] items-center justify-center rounded-[12px] w-full cursor-pointer border-0 shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
        >
          <p className="font-['Inter:Bold'] font-bold text-[16px] text-white">Use {title}</p>
        </button>
        <p className="font-['Inter:Regular'] font-normal text-[#616166] text-[11px] text-center w-full">
          Coming Soon - Backend integration required
        </p>
      </div>

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
