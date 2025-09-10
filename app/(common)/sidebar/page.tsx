"use client";

import * as React from "react";
import { House, Gamepad2 } from "lucide-react";
import { NavUser } from "../dropdown/nav-user";
import { NavMain } from "../dropdown/nav-main";
import { NavProjects } from "../dropdown/nav-projects";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "linh",
    email: "m@gmail.com",
    avatar:
      "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740&q=80",
  },
  navMain: [
    {
      title: "Game",
      url: "#",
      icon: Gamepad2,
      isActive: true,
      items: [
        {
          title: "Snake",
          url: "/snake",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Home",
      url: "/home",
      icon: House,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
