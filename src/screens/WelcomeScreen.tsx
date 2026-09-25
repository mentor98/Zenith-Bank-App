const assetPathPrefix = "/assets";
const imgVisual3D = `${assetPathPrefix}/41640.png`;
const imgArrowRight = `${assetPathPrefix}/87f08.svg`;

interface Props {
  onLogin: () => void;
  onOpenAccount: () => void;
}

export default function WelcomeScreen({ onLogin, onOpenAccount }: Props) {
  return (
    <div className="bg-gradient-to-b from-[#0a0e17] to-[#1a1f2e] flex flex-col items-start justify-between w-full h-full overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#d60a14] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-[150px] h-[150px] bg-[#d60a14] rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="flex flex-col items-center pt-[32px] px-[24px] w-full relative z-10">
        <div className="flex gap-[10px] items-center">
          <div className="bg-gradient-to-br from-[#ff5d62] to-[#d60a14] flex items-center justify-center rounded-[12px] size-[40px] shadow-lg">
            <p className="font-['Inter:Black'] font-black text-[24px] text-white leading-none">Z</p>
          </div>
          <div className="flex flex-col gap-[2px] items-start">
            <p className="font-['Inter:Extra_Bold'] font-extrabold text-[18px] text-white leading-normal tracking-wide">ZENITH BANK</p>
            <p className="font-['Inter:Semi_Bold'] font-semibold text-[#ff8a8f] text-[10px] leading-normal">EST. 2026</p>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="flex-1 relative w-full flex items-center justify-center">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full opacity-90" src={imgVisual3D} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[32px] items-start pb-[48px] px-[24px] w-full relative z-10">
        <div className="flex flex-col gap-[16px] items-start w-full">
          <p className="font-['Inter:Extra_Bold'] font-extrabold text-[36px] text-white w-full leading-tight tracking-tight">
            Banking made{" "}
            <span className="bg-gradient-to-r from-[#ff5d62] to-[#ff383c] bg-clip-text text-transparent">simple</span>
          </p>
          <p className="font-['Inter:Regular'] font-normal leading-[24px] text-[#a0aac0] text-[15px] w-full">
            Secure. Fast. Convenient. Experience modern banking designed around you.
          </p>
        </div>
        <div className="flex flex-col gap-[12px] items-start w-full">
          <button
            onClick={onLogin}
            className="bg-gradient-to-r from-[#ff5d62] to-[#d60a14] flex gap-[8px] h-[54px] items-center justify-center rounded-[28px] w-full cursor-pointer border-0 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
          >
            <p className="font-['Inter:Bold'] font-bold text-[16px] text-white">Login</p>
            <div className="size-[16px] relative shrink-0">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowRight} />
            </div>
          </button>
          <button
            onClick={onOpenAccount}
            className="border-2 border-solid border-white flex h-[54px] items-center justify-center rounded-[28px] w-full cursor-pointer bg-transparent hover:bg-white/5 transition-all duration-200 active:scale-95"
          >
            <p className="font-['Inter:Bold'] font-bold text-[16px] text-white">Open an account</p>
          </button>
        </div>
      </div>
    </div>
  );
}
