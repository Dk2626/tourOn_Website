import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as SiIcons from "react-icons/si";
import * as VscIcons from "react-icons/vsc";

export const AdminSidebarData = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <AiIcons.AiFillDashboard />,
  },
  {
    title: "Story",
    path: "/admin/story",
    icon: <AiIcons.AiFillDashboard />,
  },

  {
    title: "Customers",
    path: "/admin/customers",
    icon: <AiIcons.AiFillDashboard />,
  },
  {
    title: "City",
    path: "/admin/city",
    icon: <SiIcons.SiGoogletagmanager />,
  },
  {
    title: "Domestic Cities",
    path: "/admin/domesticcity",
    icon: <SiIcons.SiGoogletagmanager />,
  },
  {
    title: "Country",
    path: "/admin/countries",
    icon: <VscIcons.VscPackage />,
  },
  {
    title: "Tours",
    path: "/admin/tours",
    icon: <VscIcons.VscPackage />,
  },
  {
    title: "State",
    path: "/admin/state",
    icon: <VscIcons.VscPackage />,
  },
  {
    title: "Blogs",
    path: "/admin/blogpage",
    icon: <FaIcons.FaBlogger />,
  },
  {
    title: "Testimonials",
    path: "/admin/testimonials",
    icon: <AiIcons.AiOutlineTag />,
  },
  {
    title: "Users",
    path: "/admin/adminusers",
    icon: <AiIcons.AiOutlineTag />,
  },
  {
    title: "Promotion",
    path: "/admin/promotion",
    icon: <AiIcons.AiOutlineTag />,
  },
  {
    title: "Gaia Suggestions",
    path: "/admin/gaia-suggestions",
    icon: <AiIcons.AiOutlineTag />,
  },
];
