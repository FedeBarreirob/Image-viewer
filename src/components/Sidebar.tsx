import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { Box } from "@radix-ui/themes";
import {
  HamburgerMenuIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { sidebarItems } from "../helpers/sidebarItems";
import { ISidebarItem } from "../interfaces/miscellaneous.interface";
import { useUserStore } from "../store/authStore";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useUserStore();
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  return (
    <Collapsible.Root
      className="CollapsibleSidebar"
      open={isOpen}
      style={{backgroundColor: isOpen ? "#2C2C2C" : "transparent"}}
      onOpenChange={setIsOpen}
    >
      <Box className="sidebar-content">
        <div className="sidebar-header">
          {isOpen && (
            <Box className="container-header-user">
              <Box className="container-icon-user">
                <PersonIcon width={20} height={20} />
              </Box>
              {user?.username}
            </Box>
          )}
          <Collapsible.Trigger asChild>
            <button className="collapse-button">
              <HamburgerMenuIcon width={20} height={20} />
            </button>
          </Collapsible.Trigger>
        </div>
        {isOpen && (
          <nav>
            <ul>
              {sidebarItems.map((item: ISidebarItem) => (
                <li key={item.name}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
            <div className="footer-details">
              <p onClick={handleLogout}>Log out</p>
            </div>
          </nav>
        )}
      </Box>
    </Collapsible.Root>
  );
}
