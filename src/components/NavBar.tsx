import React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const charts: { title: string; href: string; description: React.ReactNode }[] =
  [
    {
      title: "Melon",
      href: "/charts/melon",
      description: (
        <div className="grid grid-cols-3 gap-1">
          <Link key="DAY" to="/charts/melon/types/day">
            <div className="bg-white dark:bg-black/50 border border-slate-300 rounded-lg ">
              <div className="flex w-full h-full justify-center items-center">
                DAY
              </div>
            </div>
          </Link>
          <Link key="TOP100" to="/charts/melon/types/top100">
            <div className="bg-white dark:bg-black/50 border border-slate-300 rounded-lg ">
              <div className="flex w-full h-full justify-center items-center">
                TOP100
              </div>
            </div>{" "}
          </Link>
          <Link key="HOT100" to="/charts/melon/types/hot100">
            <div className="bg-white dark:bg-black/50 border border-slate-300 rounded-lg ">
              <div className="flex w-full h-full justify-center items-center">
                HOT100
              </div>
            </div>
          </Link>
          <Link key="WEEK" to="/charts/melon/types/week">
            <div className="bg-white dark:bg-black/50 border border-slate-300 rounded-lg">
              <div className="flex w-full h-full justify-center items-center">
                WEEK
              </div>
            </div>
          </Link>
          <Link key="MONTH" to="/charts/melon/types/month">
            <div className="bg-white dark:bg-black/50 border border-slate-300 rounded-lg">
              <div className="flex w-full h-full justify-center items-center">
                MONTH
              </div>
            </div>
          </Link>
        </div>
      ),
    },
    {
      title: "Billboard",
      href: "/charts/billboard",
      description: (
        <div className="grid grid-cols-2 gap-1">
          <Link key="HOT100" to="/charts/billboard/types/hot100">
            <div className="bg-white dark:bg-black/50 border border-slate-300 rounded-lg ">
              <div className="flex w-full h-full justify-center items-center">
                HOT100
              </div>
            </div>
          </Link>
          <Link key="GLOBAL200" to="/charts/billboard/types/global200">
            <div className="bg-white dark:bg-black/50 border border-slate-300 rounded-lg">
              <div className="flex w-full h-full justify-center items-center">
                GLOBAL200
              </div>
            </div>
          </Link>
          <Link key="BILLBOARD200" to="/charts/billboard/types/billboard200">
            <div className="bg-white dark:bg-black/50 border border-slate-300 rounded-lg">
              <div className="flex w-full h-full justify-center items-center">
                BILLBOARD200
              </div>
            </div>
          </Link>
          <Link key="TIKTOK TOP50" to="/charts/billboard/types/tiktoktop50">
            <div className="bg-white dark:bg-black/50 border border-slate-300 rounded-lg">
              <div className="flex w-full h-full justify-center items-center">
              TIKTOK TOP50
              </div>
            </div>
          </Link>
        </div>
      ),
    },
    {
      title: "YouTube",
      href: "#",
      description: "Coming soon ...",
    },
    {
      title: "Genie",
      href: "#",
      description: "Coming soon ...",
    },
    {
      title: "Flo",
      href: "#",
      description: "Coming soon ...",
    },
    {
      title: "Bugs",
      href: "#",
      description: "Coming soon ...",
    },
  ];

const NavBar = () => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            {/* <Link href="/docs" legacyBehavior passHref> */}
            {/* <Link key="Home" to="/"> */}
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link key="Home" to="/">
                Home
              </Link>
            </NavigationMenuLink>
            {/* </Link> */}
            {/* </Link> */}
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/charts">
              <NavigationMenuTrigger>Charts</NavigationMenuTrigger>
              <NavigationMenuContent asChild>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {charts.map((chart) => (
                    <ListItem
                      key={chart.title}
                      id={chart.href}
                      title={chart.title}
                    >
                      {chart.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {/* <Link href="/docs" legacyBehavior passHref> */}
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/explore">Explore</Link>
            </NavigationMenuLink>
            {/* </Link> */}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, id, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        {/* <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a> */}
        <div
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <Link to={id ? id : ""}>
            <div className="text-sm font-medium leading-none">{title}</div>
          </Link>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </div>
        </div>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default NavBar;
