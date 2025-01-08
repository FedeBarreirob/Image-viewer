import * as Collapsible from "@radix-ui/react-collapsible";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { Box } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { sidebarItems } from "../utils/sidebarItems";
import { ISidebarItem } from "../interfaces/miscellaneous.interface";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible.Root
      className="CollapsibleSidebar"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Box className="sidebar-content">
        {isOpen && (
          <nav>
            <ul>
              {sidebarItems.map((item: ISidebarItem) => (
                <li>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Box>
      <Collapsible.Trigger asChild>
        <button className="collapse-button">
          {isOpen ? (
            <ChevronLeftIcon width={25} height={25} />
          ) : (
            <ChevronRightIcon width={25} height={25} />
          )}
        </button>
      </Collapsible.Trigger>
    </Collapsible.Root>
  );
}
