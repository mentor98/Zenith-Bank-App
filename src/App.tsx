import { useState } from "react";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductsServicesScreen from "./screens/ProductsServicesScreen";
import LifestyleScreen from "./screens/LifestyleScreen";

type Screen = "welcome" | "home" | "products" | "lifestyle";

interface UserState {
  isLoggedIn: boolean;
  userName: string;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
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
      </div>
    </div>
  );
}
