import { BarChart2, BriefcaseMedical, CheckLine, ClipboardCheck, LayersIcon, ShoppingCart, SyringeIcon, TestTube, UserLock, UserMinus } from "lucide-react"
import routes from "./routes"

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const Languages = [
  { code: "en", name: "english", image: "/defaults/languages/english.svg" },
  { code: "ar", name: "arabic", image: "/defaults/languages/arabic.svg" }
]
export const LanguagesList = ["en", "ar"]

export const SidebarLinks = [
  {
    name: "Dashboard",
    href: routes.home,
    icon: BarChart2
  },
  {
    name: "Admins",
    href: routes.admins.index,
    icon: UserLock
  },
  {
    name: "Patients",
    href: routes.users.index + "?type=Patient",
    icon: UserMinus
  },
  {
    name: "Custodians",
    href: routes.users.index + "?type=Custodian",
    icon: ClipboardCheck
  },
  {
    name: "Nurses",
    href: routes.users.index + "?type=Nurse",
    icon: SyringeIcon
  },
  {
    name: "Nurse Papers",
    href: routes.papers.index,
    icon: LayersIcon
  },
  {
    name: "Orders",
    href: routes.orders.index,
    icon: ShoppingCart
  },
  {
    name: "Services",
    href: routes.services.index,
    icon: CheckLine
  },
  {
    name: "Specific Services",
    href: routes.specificServices.index,
    icon: TestTube
  },
  {
    name: "Illness Types",
    href: routes.illnessTypes.index,
    icon: BriefcaseMedical
  }
]
