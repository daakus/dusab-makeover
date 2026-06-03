export type DemoService = {
  id: string;
  name: string;
  category: string;
  durationMins: number;
  priceGhs: number;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export const demoServices: DemoService[] = [
  {
    id: "1",
    name: "Traditional Knotless Braids",
    category: "Hair Artistry",
    durationMins: 240,
    priceGhs: 650,
    description:
      "Exquisite artisan braiding technique offering a seamless, natural look that prioritizes scalp health and longevity.",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbL9ifyx1-zCJILC7OvrIPnBP1ko0aNXCz8ZPLIsnmUc5KJyMvFp9ShK5eVdDWY9SHKLuSLbTGjDvZeT08zLGU71f0xhPQYLDTRxarvz5h-VoKhBLM0ToAXEvPP1PWa7WN2lIFWeoijUtivFJkevCKsTche1biVqCSSHeBHkWiKzKLKpQaK3isHcU6UxKoVdIOuk2NBbn66k6utH0ykr0FZ7pSF2PgPiAFzXbE8nsex5oh4WiDaMB2SPAw0sSOoFqCBUidCREy-FB8",
    imageAlt: "Artistic braided hair design",
  },
  {
    id: "2",
    name: "Signature Gel Overlay",
    category: "Nail Couture",
    durationMins: 75,
    priceGhs: 280,
    description:
      "High-gloss reinforced gel sculpting for natural nails. Includes intensive cuticle care and aromatic hand massage.",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvNif31l41xpXx7TBd_v4VxCzb_kh0WJqcgwTwR_Nf8WGq9SJ6adpLJAG6GZR59q6KsNAMx9nJCaiyBCmdbjm8l5CwEYxSkLXLY4zpbD4W0OIN4zpN_mFlc9gki7Camz1o_oNW2JtHsaN-MSk601O__-zIVJIdrIUbDfoWNbraWsMm-lhIHTlgXohklCZjYEmyM-fA56VUSZbNOXvTiLV3yBWcLfMq09uT7BRcnpPDKEjKtixBqm_aCEmxi_St6YfV7XBuDO3Jhaa-",
    imageAlt: "Elegant gel nails",
  },
  {
    id: "3",
    name: "Deep Sea Mineral Facial",
    category: "Skin Radiance",
    durationMins: 90,
    priceGhs: 450,
    description:
      "Revitalizing mineral-rich treatment designed to oxygenate and clarify, leaving the skin with a luminous editorial glow.",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTg-0c7JPK-v8fRz60-77_Ppedxs59rCgnweTliz7IYhGGY29vc5jMGxq8tYzKBhQMH0pdu_17dRC-thgaPaoT4U0DP2gNZRlL78XIofacCypRwMetfCxYuDKWLKx3XXCp98B0sST0WiOcgyGx-JfvHoSXwENP83ymPNGrc_qjgKgviHr1scGJLK3ZiPeyTAwE_llPLPV73c8R0EHWmT1ZWLWU2534zJw57eUNhsCkVqQmNEGlk_Y9ktWap6yCXqWmyQwhujbtjDF-",
    imageAlt: "Spa facial products",
  },
  {
    id: "4",
    name: "Bridal Glow Portraiture",
    category: "Editorial Makeup",
    durationMins: 180,
    priceGhs: 1200,
    description:
      "Full luxury bridal transformation including pre-event consultation, long-wear high-definition products, and false lash artistry.",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_jT19rbRJD8H6Rf3I5NOyx4PSgsZNM-R9W1qHK1efSO2INqCipCFSGSy5_p04R5TKWYs8Fr2Z1EIodmAMHJ8DiNDtnQyk8CbYbQFXkGDDsS_rotPlIhWh2goIXQRhuwBKOYOzFqqc16LkR4IG9iLR9tdt0oUt7S-auHWhah4KARhHSWiwPHFxrLDnN-c-gMqDOgeRLBT3MnBW0K43qaTpb0TpCpG8svC7cAS4ayvLPORdOD-FZORVNeWQBCmOveeEaX3iKUSv68Qi",
    imageAlt: "Editorial makeup",
  },
];

export const serviceCategories = [
  "All Services",
  "Hair Artistry",
  "Nail Couture",
  "Skin Radiance",
  "Editorial Makeup",
] as const;

export type DemoClient = {
  id: string;
  name: string;
  tier: string;
  tierStyle: "vip" | "regular" | "new";
  phone: string;
  lastVisit: string;
  lastService: string;
  lifetimeSpend: number;
  avatarSrc: string;
  avatarAlt: string;
  online?: boolean;
};

export const demoClients: DemoClient[] = [
  {
    id: "1",
    name: "Zuri Okonjo",
    tier: "VIP Gold Member",
    tierStyle: "vip",
    phone: "(233) 24 555 0192",
    lastVisit: "Oct 24, 2023",
    lastService: "Radiance Facial",
    lifetimeSpend: 2450,
    avatarSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmMrLiKvXqkkwcmW1OXA8WCtcm4VihNY384zeJMIY6Y0Yy_hHBx2727-9dGZ2u7NwLUUR9s6-YeL36AwXhwtmRLjXybZW-nvD-KPy7259QudPjkx5-iJTAndskGMwxfpEPTdndOujixeAQLILGnOmeNSnmemWZH0VeLw5RNMdG72AIGHFalS8b_P014L4b5CokUSaTtEHzviA8aW2tvjEYlVWV9MZd1ixi4H05ZZxXk3FPPrhw1OrLR_TN1A2HVnFYdTHyFo0qYsg7",
    avatarAlt: "Client portrait",
    online: true,
  },
  {
    id: "2",
    name: "Imani Asante",
    tier: "Regular Visitor",
    tierStyle: "regular",
    phone: "(233) 20 555 0841",
    lastVisit: "Nov 02, 2023",
    lastService: "Silk Press Pro",
    lifetimeSpend: 890,
    avatarSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC83n-l5UoHicUfAIWz6HyHLMZcGfoFLRAbcHIiwdvnhEbDPlA6OwGnuqOB0BAUl4B6b3wKVlOQIpCTknKgc53DvJmwmyPy0iAEZ0IOMg374xfwlBUfkVrYEN2zgt4om1lgdG8bbGCNMad23-Ni0Y_DyHxifUCkktz21HKyPsPfwKBZwOo7vszFV-2hFg-2KcM96EsoNrgLoEUFrnuUAVn7_Q_z1BWZ3j3PO4Mrz2dH6l9sCtaTTB-LgftTCopXCdZc-e3rzi46SZbL",
    avatarAlt: "Client portrait",
  },
  {
    id: "3",
    name: "Amara Diop",
    tier: "New Prospect",
    tierStyle: "new",
    phone: "(233) 54 555 0337",
    lastVisit: "Oct 15, 2023",
    lastService: "Lash Extension",
    lifetimeSpend: 150,
    avatarSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAZENZIe3tjhn9fFalWJ6OuoOqAg_XKTdTWV9YaeOMpiYpULLW8ux55fMMEWNFbNq3OiE8vlmwYOVOKSN9LAsV_zGGrLUizAkSzUTO-OSjXNs6sSZPHtGtaC4JkWactZz-YmhVcNcVIopwEFHvw3tVapIDtXQ8twcxVLniQcv7cULtxNdEeAebPl3z0-ZYAg-NGzsuXlHNaXeN3WQt4HBW3frd6bAVUttfvudX5vOSnlCJ1OgVH9ngnBxV7zoFuLHqkm4wsXLcSdNZl9",
    avatarAlt: "Client portrait",
  },
  {
    id: "4",
    name: "Nia Mensah",
    tier: "VIP Gold Member",
    tierStyle: "vip",
    phone: "(233) 24 555 0772",
    lastVisit: "Oct 30, 2023",
    lastService: "Full Manicure",
    lifetimeSpend: 1820,
    avatarSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA95GKPidMwtWpXJpXHNxDNFwGu8duyc1OvKYpuNm5LB9Rr43TqttVf2l57PTpGv522jY6KnW79ymKiRbjAqO8I2SoapEYfeyFS0_NbV7EkPCprnPBTzv6uJPJGGw-b1Qslm5m6UWS4eGo8rBWBLinyR6a3QyppcVPjsn_0h8AyZue5fO49rzm2gUFD-fQE3IKWWcD712q-YfsUUe44qFHxO2ZYlAbPxnn9yzpifwrx_YK8liR3JorzRFOp5HTPUuGnQUy-qh65PMeU",
    avatarAlt: "Client portrait",
  },
];

export type DemoStylist = {
  id: string;
  name: string;
  role: string;
  status: "available" | "busy";
  avatarSrc: string;
  avatarAlt: string;
};

export const demoStylists: DemoStylist[] = [
  {
    id: "1",
    name: "Amara Okafor",
    role: "Master Stylist",
    status: "available",
    avatarSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAz-jj-7Ga1glbYpzjqhjPof63gWESQoCZLVDtsQKv9pB53sSsbYoENPfqFIU6AY8-w6_F2k8t4VEygUoT-7m-1cECpZaxyvelx-55Ot7lxspHV2htk8IdKZ3vR-i-RERrgjSrFCB_IIFvLo4G4Qtkh9TwqAWARlznGMl8zviUBzZ-b9bvPXKSkLXOauj9f3d0K22nAG9vGEBdzUpBk4EnQxd5xROhnhd1OfhMBdfYrug07Tjnonw778Md9NmGpxSwe7ojiEEZ28nIO",
    avatarAlt: "Stylist portrait",
  },
  {
    id: "2",
    name: "Elena Vance",
    role: "Color Specialist",
    status: "available",
    avatarSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-xNY1zG6BKFRtCpM6JluRj0hnRCJU7atkONleIWixIl_i40mp1TNBAF5hwWiCzoDtAFI4aMQlYyLJ7b8r2-zRf9mDfrtXB2ZyJESCM9-UG1UB-00I6byGD8VlKTtkCYaZChBt2A8wACvwE-UzaeJDJZoKR8wt32m4RbdvBpuT4dux9bpMMWyauadOwnr8IXBqQVBz4xenGXJnn-pBEK4yG9lmkYUzY-FtsWxRxUkVLvvBybee3xVE_5BLh_VVLUuAs8YBTPX0Dfl-",
    avatarAlt: "Stylist portrait",
  },
  {
    id: "3",
    name: "Jordan Smith",
    role: "Nail Architect",
    status: "busy",
    avatarSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_FWZDY9OiFC13C0dsx8O8CcU1KJaYzZT1GiEKUjU-HXweexKU8oJ-rdlm7IEFWiXveKfUWLaFAkPipu7CbRyw-k_gqOHd4ROcZ1iv5QkSablL7OR46S96Nl3X4eXVD_fBR9A2riIeYk7k4MWBB8g2PT1KKCNtG6eyu2AXZZkgNUeXzwqAOsAH4I2zdSndk00n8ji4vLid06QQNr2n4rM3IUcs2l3yb_qVeeyEX0-jDLDpktAVznAOQWH7VzcVV-VmY0NCFuR8-Q_5",
    avatarAlt: "Stylist portrait",
  },
];

export type DemoAppointmentBlock = {
  id: string;
  variant: "confirmed" | "pending" | "completed";
  timeLabel: string;
  title: string;
  client: string;
  stylist?: string;
  stylistAvatar?: string;
  heightClass: string;
};

export const demoDayAppointments: DemoAppointmentBlock[] = [
  {
    id: "a1",
    variant: "confirmed",
    timeLabel: "09:00 - 10:30",
    title: "Deep Silk Press & Hydration",
    client: "Nia Long",
    stylist: "Amara Okafor",
    stylistAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAj7pJizTY09Gv5xAVUXvQcnVJ-VoBB6167OFNWYsQcw8UDmhs0ZOrkD57keCmrcntPX3go-LR5QdXn373T9ceu3OM39OBJACJr0HW1lL__oN0Yb8fWdr0oUDchAr0-UvrE-OTzDJP2iiRzzwIZme3hC0UBayOBHW6M5s-0cQ0Mw6vTF5cVrxZbyC835Ha-8wf02O9zUKt9BkeASvFom3J9ZwJ90Y5QxMu0LU29BdJBr1iI8_mzzNGELJCwQ8m_WdxvQShkt3P2Ix9l",
    heightClass: "min-h-[180px]",
  },
  {
    id: "a2",
    variant: "pending",
    timeLabel: "11:00 AM",
    title: "Scalp Detox Therapy",
    client: "Zara Isley",
    heightClass: "min-h-[110px]",
  },
  {
    id: "a3",
    variant: "completed",
    timeLabel: "08:00 - 09:00",
    title: "Classic Sculpture Mani",
    client: "Iman Crawford",
    stylist: "Jordan Smith",
    heightClass: "min-h-[150px]",
  },
  {
    id: "a4",
    variant: "confirmed",
    timeLabel: "01:30 - 03:30",
    title: "Golden Balayage Ritual",
    client: "Solange Knowles",
    stylist: "Elena Vance",
    stylistAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuADAajPcqsg1Jr0kzCWh8_f0zKnNyqM13CIhEHRU8O2jeSsTpwiEfPb-9DXBpZKdsiI3hk8Wi9qVrzA_qwkp-JGPlyez9Rl9L-WerDQXhTmr37r9A-V-PSTNh8Si85YOP14b_QBF14U6LtYv_BCkUM2F8WXuNEO0qSvZTZkIBMerTiEji_X5Bwu_uVliBxonM7FZOMhK8eeHTg2ndh4lKWFaZ72x9EZa5ZSKtFteSuO718FBsasYl36Ljwc0VP771lUGcldV9_J2Mb6",
    heightClass: "min-h-[200px]",
  },
];
