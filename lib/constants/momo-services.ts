export type MomoService = {
  id: string;
  label: string;
  price: number;
  category: "service" | "training";
};

export const MOMO_SERVICES: MomoService[] = [
  { id: "makeup",         label: "Professional Makeup Artistry",  price: 150, category: "service"  },
  { id: "hairstyling",    label: "Hairstyling",                   price: 120, category: "service"  },
  { id: "frontal-wig",    label: "Frontal Wig Installation",      price: 200, category: "service"  },
  { id: "tutorial-1on1",  label: "One-on-One Tutorial",           price: 300, category: "training" },
  { id: "online-training",label: "Online Training",               price: 250, category: "training" },
];

export const MOMO_NUMBER = "0546006627";
export const WHATSAPP_NUMBER = "233546006627";
