import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { ModeToggle } from "./ModeToggle";
import { Dialog } from "@headlessui/react";
import { CircleUser, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import PlaylistSheet from "./PlaylistSheet";
import { Link } from "react-router-dom";
import { useAuth } from "@/provider/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import AuthGuard from "./AuthGuard";
import { usePlaylist } from "@/provider/PlaylistProvider";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Charts", href: "/charts" },
  { name: "Explore", href: "/explore" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);

  const { currentUser, logout } = useAuth();
  const { updateNowPlaying, updatePendingPlaylist } = usePlaylist();

  const handleLogout = () => {
        
    updateNowPlaying(null)
    updatePendingPlaylist([])

    localStorage.removeItem("nowPlaying");
    localStorage.removeItem("pendingPlaylist");

    logout()
  }

  const handleScroll = () => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > prevScrollPosition) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setPrevScrollPosition(currentScrollPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      {/* <header className="fixed inset-x-0 top-0 z-50 bg-slate-100 dark:bg-slate-800 bg-opacity-70 dark:bg-opacity-70"> */}
      <header
        className={`sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 ${
          visible
            ? ""
            : "bg-white dark:bg-slate-900/75 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06]"
        } `}
      >
        <nav
          className="flex items-center justify-between p-2 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <div className="text-5xl font-extrabold my-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-sriracha-regular">
                <Link to="/">mucha</Link>
              </span>
            </div>
          </div>
          <div className="flex flex-row space-x-2 lg:hidden">
            <AuthGuard user={currentUser} allowedRole={["user", "admin"]}>
              <PlaylistSheet />
            </AuthGuard>
            <ModeToggle />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="absolute h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <NavBar />
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-2">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{currentUser.username}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/user/setting">
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </Link>
                  <Link to="/user/playlist">
                    <DropdownMenuItem>My playlist</DropdownMenuItem>
                  </Link>
                  {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <></>
            )}
            {!currentUser ? (
              <Link
                to="/login"
                className="text-sm font-semibold text-center leading-6"
              >
                <Button variant="link" className="dark:text-current">
                  Login
                  </Button>
              </Link>
            ) : (
              <></>
            )}

            <AuthGuard user={currentUser} allowedRole={["user", "admin"]}>
              <PlaylistSheet />
            </AuthGuard>
            <ModeToggle />
          </div>
        </nav>
        <Dialog
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">mucha</span>
                mucha
              </a>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="absolute h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {/* <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white"
                  >
                    Log in
                  </a> */}
                  <Link
                    key="Login"
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-48 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-96"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[30.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[60.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-2 sm:py-2 lg:py-4"></div>
        <div
          className="absolute inset-x-0 top-[calc(100%-28rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-60rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
