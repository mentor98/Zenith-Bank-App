const assetPathPrefix = "/assets";
const imgLifestyleCard = `${assetPathPrefix}/0a50b.png`;
const imgLifestyleCard1 = `${assetPathPrefix}/06e4e.png`;
const imgLifestyleCard2 = `${assetPathPrefix}/e79a0.png`;
const imgChevronLeft = `${assetPathPrefix}/30066.svg`;
const imgPlane = `${assetPathPrefix}/20b2d.svg`;
const imgChevronRight = `${assetPathPrefix}/745f4.svg`;
const imgBed = `${assetPathPrefix}/3b851.svg`;
const imgCar = `${assetPathPrefix}/4c325.svg`;
const imgHome = `${assetPathPrefix}/db9e8.svg`;
const imgFileText = `${assetPathPrefix}/63661.svg`;
const imgSmartphone = `${assetPathPrefix}/02e1d.svg`;
const imgArrowLeftRight = `${assetPathPrefix}/0a035.svg`;
const imgMenu = `${assetPathPrefix}/52a70.svg`;

type Screen = "welcome" | "home" | "products" | "lifestyle";

interface LifestyleCardProps {
  bg: string;
  icon: string;
  title: string;
  subtitle: string;
}

function LifestyleCard({ bg, icon, title, subtitle }: LifestyleCardProps) {
  return (
    <div className="relative flex flex-col h-[170px] items-start overflow-hidden rounded-[18px] w-full shrink-0 cursor-pointer transition-transform duration-300 hover:scale-102">
      <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[18px]">
        <img alt="" className="absolute max-w-none object-cover rounded-[18px] size-full" src={bg} />
        <div className="absolute bg-[rgba(0,0,0,0.40)] inset-0 rounded-[18px] group-hover:bg-[rgba(0,0,0,0.50)] transition-all" />
      </div>
      <div className="absolute bottom-0 flex items-center justify-between left-0 p-[18px] right-0">
        <div className="flex gap-[12px] items-center">
          <div className="bg-gradient-to-br from-[#ff5d62] to-[#d60a14] flex items-center justify-center rounded-[20px] size-[40px] shadow-lg">
            <div className="relative size-[20px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={icon} />
            </div>
          </div>
          <div className="flex flex-col gap-[2px] items-start">
            <p className="font-['Inter:Bold'] font-bold text-[16px] text-white whitespace-nowrap tracking-tight">{title}</p>
            <p className="font-['Inter:Regular'] font-normal text-[#e5e7eb] text-[12px] whitespace-nowrap">{subtitle}</p>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.25)] flex items-center justify-center rounded-[16px] size-[32px] hover:bg-[rgba(255,255,255,0.35)] transition-all">
          <div className="relative size-[16px]">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronRight} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  onBack: () => void;
  onNavigate: (s: Screen) => void;
}

export default function LifestyleScreen({ onBack, onNavigate }: Props) {
  return (
    <div className="bg-gradient-to-b from-[#f5f6f8] to-[#eef0f5] flex flex-col items-start w-full h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#d60a14] to-[#a00a0f] flex h-[64px] items-center px-[20px] w-full shrink-0 shadow-md">
        <div className="flex gap-[12px] items-center">
          <button onClick={onBack} className="flex items-center justify-center p-[6px] bg-transparent border-0 cursor-pointer hover:bg-white/20 rounded-full transition-all">
            <div className="relative size-[20px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronLeft} />
            </div>
          </button>
          <p className="font-['Inter:Bold'] font-bold text-[18px] text-white tracking-tight">Lifestyle</p>
        </div>
      </div>

      {/* Lifestyle Cards */}
      <div className="flex flex-col gap-[18px] items-start p-[16px] w-full overflow-y-auto flex-1">
        <LifestyleCard bg={imgLifestyleCard} icon={imgPlane} title="Flights" subtitle="Book flights, explore the world." />
        <LifestyleCard bg={imgLifestyleCard1} icon={imgBed} title="Hotels" subtitle="Comfortable stays, better journeys." />
        <LifestyleCard bg={imgLifestyleCard2} icon={imgCar} title="Transportation" subtitle="Ride, travel, move with ease." />
      </div>

      <div className="h-[16px] w-full shrink-0" />

      {/* Bottom Nav */}
      <div className="bg-white border-t border-[#e8e8eb] flex h-[80px] items-center justify-between px-[8px] w-full shrink-0 shadow-lg">
        {[
          { icon: imgHome, label: "Home", tab: "home" },
          { icon: imgFileText, label: "Pay Bills", tab: "pay" },
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
