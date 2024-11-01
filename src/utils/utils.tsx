import User from "../assets/images/user.svg";
import Admin from "../assets/images/admin.svg";
import History from "../assets/images/history.svg";
import MemberList from "../assets/images/member-list.svg";
import SignOut from "../assets/images/sign-out.svg";
import Statistics from "../assets/images/statistics.svg";

export const left_menu = [
  { icon: User, name: "รายชื่อ", href: "users" },
  { icon: History, name: "รายการประวัติ", href: "histories" },
  { icon: Statistics, name: "รายการเพลง", href: "music-records" },
  { icon: Admin, name: "สิทธิ์ของผู้ดูแล", href: "roles" },
  { icon: MemberList, name: "รายชื่อผู้ดูแล", href: "admins" },
  { icon: SignOut, name: "ออกจากระบบ", href: "logout" },
];
