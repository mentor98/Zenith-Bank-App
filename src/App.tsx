import { useState } from "react";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductsServicesScreen from "./screens/ProductsServicesScreen";
import LifestyleScreen from "./screens/LifestyleScreen";
import ServicePage from "./screens/ServicePage";

type Screen = "welcome" | "home" | "products" | "lifestyle" | "service";

interface UserState {
  isLoggedIn: boolean;
  userName: string;
}

interface ServiceData {
  id: string;
  icon: string;
  title: string;
  description: string;
  fullDescription: string;
  features: string[];
}

const SERVICE_DETAILS: Record<string, ServiceData> = {
  transfer: {
    id: "transfer",
    icon: "/assets/95d81.svg",
    title: "Transfer Money",
    description: "Send money instantly",
    fullDescription:
      "Transfer money to other bank accounts quickly and securely. Our transfer service allows you to send funds domestically with competitive rates and minimal fees.",
    features: [
      "Instant transfers to local accounts",
      "Competitive exchange rates",
      "Low transfer fees",
      "Transaction history tracking",
      "Save beneficiaries for quick transfers",
    ],
  },
  "pay-bills": {
    id: "pay-bills",
    icon: "/assets/a6b99.svg",
    title: "Pay Bills",
    description: "Settle your bills easily",
    fullDescription:
      "Pay all your bills conveniently through Zenith Bank. From utilities to subscriptions, manage all payments in one place with instant confirmation.",
    features: [
      "Pay utility bills (electricity, water, gas)",
      "Phone & internet bill payments",
      "Insurance premium payments",
      "School fees settlement",
      "Automatic bill reminders",
    ],
  },
  airtime: {
    id: "airtime",
    icon: "/assets/cf891.svg",
    title: "Buy Airtime",
    description: "Top up your phone instantly",
    fullDescription:
      "Purchase airtime for any network instantly. Support for all major carriers with instant activation and best market rates.",
    features: [
      "All network providers supported",
      "Instant airtime delivery",
      "Best market rates",
      "Airtime gift to others",
      "Auto-recharge options",
    ],
  },
  cards: {
    id: "cards",
    icon: "/assets/d7200.svg",
    title: "Cards Management",
    description: "Manage your cards",
    fullDescription:
      "Manage all your Zenith Bank cards in one place. Block, unblock, set limits, and track all card transactions securely.",
    features: [
      "View all active cards",
      "Block/unblock cards instantly",
      "Set spending limits",
      "Transaction history",
      "Card replacement requests",
    ],
  },
  "locate-us": {
    id: "locate-us",
    icon: "/assets/a3d09.svg",
    title: "Find Nearest Branch",
    description: "Locate nearest branch",
    fullDescription:
      "Find the nearest Zenith Bank branch or ATM to your current location. Get directions, operating hours, and available services.",
    features: [
      "Map view of all branches",
      "ATM locator",
      "Operating hours",
      "Available services",
      "Get directions via GPS",
    ],
  },
  beneficiaries: {
    id: "beneficiaries",
    icon: "/assets/f0880.svg",
    title: "Manage Beneficiaries",
    description: "Save frequent recipients",
    fullDescription:
      "Manage your list of frequent transfer recipients. Add, edit, or remove beneficiaries for faster transactions.",
    features: [
      "Add new beneficiaries",
      "Edit beneficiary details",
      "Quick access saved recipients",
      "Beneficiary categories",
      "Delete unused beneficiaries",
    ],
  },
  forex: {
    id: "forex",
    icon: "/assets/fed86.svg",
    title: "Forex Services",
    description: "Exchange currencies",
    fullDescription:
      "Access competitive foreign exchange rates for international transactions. Buy and sell foreign currencies easily.",
    features: [
      "Real-time exchange rates",
      "Competitive spreads",
      "Multiple currency pairs",
      "Fast conversion",
      "Rate alerts & notifications",
    ],
  },
  "finance-manager": {
    id: "finance-manager",
    icon: "/assets/ca3c6.svg",
    title: "Finance Manager",
    description: "Track your finances",
    fullDescription:
      "Comprehensive financial management tools to help you budget, save, and invest wisely. Get insights into your spending habits.",
    features: [
      "Spending analytics",
      "Budget creation & tracking",
      "Savings goals",
      "Investment options",
      "Financial reports",
    ],
  },
  settings: {
    id: "settings",
    icon: "/assets/d1ff4.svg",
    title: "Settings",
    description: "Customize your account",
    fullDescription:
      "Manage your account preferences, security settings, notifications, and personal information in one secure location.",
    features: [
      "Account preferences",
      "Security settings",
      "Notification preferences",
      "Privacy controls",
      "Linked accounts",
    ],
  },
  alerts: {
    id: "alerts",
    icon: "/assets/76835.svg",
    title: "Alerts & Notifications",
    description: "Manage your alerts",
    fullDescription:
      "Set up and manage transaction alerts, security notifications, and promotional updates. Stay informed in real-time.",
    features: [
      "Transaction alerts",
      "Security notifications",
      "Login alerts",
      "Balance updates",
      "Promotional messages",
    ],
  },
  "qr-payments": {
    id: "qr-payments",
    icon: "/assets/b9893.svg",
    title: "QR Payments",
    description: "Scan and pay",
    fullDescription:
      "Make payments by scanning QR codes. Fast, secure, and contactless payment method for modern transactions.",
    features: [
      "Scan QR codes to pay",
      "Generate payment QR",
      "Payment confirmation",
      "Transaction history",
      "Refund management",
    ],
  },
  profile: {
    id: "profile",
    icon: "/assets/add47.svg",
    title: "User Profile",
    description: "Manage your profile",
    fullDescription:
      "Update your personal information, contact details, and preferences. Keep your profile secure and up-to-date.",
    features: [
      "Edit personal info",
      "Update contact details",
      "Change password",
      "Two-factor authentication",
      "Profile picture",
    ],
  },
  upcoming: {
    id: "upcoming",
    icon: "/assets/f2da3.svg",
    title: "Upcoming Events",
    description: "See scheduled events",
    fullDescription:
      "View upcoming bank events, product launches, and promotions. Stay updated with Zenith Bank news and offers.",
    features: [
      "Event calendar",
      "Bank announcements",
      "New product launches",
      "Promotional offers",
      "Event notifications",
    ],
  },
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [activeService, setActiveService] = useState<ServiceData | null>(null);
  const [user, setUser] = useState<UserState>({
    isLoggedIn: false,
    userName: "Emmanuel",
  });

  const handleLogin = () => {
    setUser({ ...user, isLoggedIn: true });
    setScreen("home");
  };

  const handleOpenAccount = () => {
    setUser({ ...user, isLoggedIn: true });
    setScreen("home");
  };

  const handleLogout = () => {
    setUser({ isLoggedIn: false, userName: "Emmanuel" });
    setScreen("welcome");
  };

  const handleNavigate = (newScreen: Screen) => {
    setScreen(newScreen);
  };

  const handleOpenService = (serviceId: string) => {
    const service = SERVICE_DETAILS[serviceId];
    if (service) {
      setActiveService(service);
      setScreen("service");
    }
  };

  return (
    <div className="h-dvh w-full flex items-center justify-center bg-gradient-to-br from-[#f5f6f8] via-[#eef0f5] to-[#e5e8f0] overflow-hidden">
      <div className="relative w-full max-w-[390px] h-full bg-[#f5f6f8] flex flex-col overflow-hidden shadow-2xl rounded-lg md:rounded-2xl">
        {screen === "welcome" && !user.isLoggedIn && (
          <WelcomeScreen onLogin={handleLogin} onOpenAccount={handleOpenAccount} />
        )}
        {screen === "home" && user.isLoggedIn && (
          <HomeScreen
            onNavigate={handleNavigate}
            activeTab="home"
            userName={user.userName}
            onLogout={handleLogout}
            onOpenService={handleOpenService}
          />
        )}
        {screen === "products" && user.isLoggedIn && (
          <ProductsServicesScreen
            onBack={() => setScreen("home")}
            onNavigate={handleNavigate}
          />
        )}
        {screen === "lifestyle" && user.isLoggedIn && (
          <LifestyleScreen
            onBack={() => setScreen("home")}
            onNavigate={handleNavigate}
          />
        )}
        {screen === "service" && user.isLoggedIn && activeService && (
          <ServicePage
            serviceId={activeService.id}
            icon={activeService.icon}
            title={activeService.title}
            description={activeService.description}
            fullDescription={activeService.fullDescription}
            features={activeService.features}
            onBack={() => setScreen("home")}
            onNavigate={handleNavigate}
          />
        )}
      </div>
    </div>
  );
}
