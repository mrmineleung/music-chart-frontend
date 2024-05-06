import { Link, useLocation } from "react-router-dom"

const UserSideNavBar = () => {

    const sideNavBarItem = [
        {
            name: "General",
            link: "/user/setting",
        },
        {
            name: "My Playlist",
            link: "/user/playlist",
        },
    ]

    const location = useLocation();
    const { pathname } = location;
    console.log(pathname)
  return (
    <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >

            {sideNavBarItem.map(item => pathname == item.link? <Link to={item.link} className="font-semibold text-primary">{item.name}</Link> : <Link to={item.link}>{item.name}</Link>)}
            {/* <Link to="/user/setting" className="font-semibold text-primary">
              General
            </Link>
            {pathname == "/user/playlist" ? <Link to="/user/playlist" className="font-semibold text-primary">My Playlist</Link> :
            <Link to="/user/playlist">My Playlist</Link>} */}
            {/* <Link to="#">Integrations</Link>
            <Link to="#">Support</Link>
            <Link to="#">Organizations</Link>
            <Link to="#">Advanced</Link> */}
          </nav>
  )
}

export default UserSideNavBar