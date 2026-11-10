import {
  House,
  PanelsTopLeft,
  Package,
  MessagesSquare,
  UsersRound,
} from "lucide-react";


export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: House,
      isActive: true,
    },
    {
      title: "Platform Management",
      url: "#",
      icon: PanelsTopLeft,
      items: [
        {
          title: "establishments",
          url: "/establishments",
        },
        {
          title: "orders",
          url: "/orders",
        },
      ],
    },
    {
      title: "Catalog",
      url: "#",
      icon: Package,
      items: [
        {
          title: "products",
          url: "/products",
        },
        {
          title: "categories",
          url: "/categories",
        },
        {
          title: "manufacturers",
          url: "/manufacturers",
        },
      ],
    },
    {
      title: "Communication",
      url: "#",
      icon: MessagesSquare,
      items: [
        {
          title: "slider",
          url: "/slider",
        },
        {
          title: "notifications",
          url: "/notifications",
        },
        {
          title: "governorates",
          url: "/governorates",
        },
      ],
    },
    {
      title: "team",
      url: "#",
      icon: UsersRound,
      items: [
        {
          title: "staff",
          url: "/staff",
        },
        {
          title: "roles",
          url: "/roles",
        },
      ],
    },
  ],
};