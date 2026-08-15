import { WHATSAPP_NUMBER } from "@/lib/constants/momo-services";

export interface BookingWhatsAppPayload {
  customerName: string;
  phoneNumber: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  amount: number;
  receiptUrl: string;
}

/** Vendor alert — sent TO Dusab Beauty Palour artist when customer submits a booking */
export function buildBookingWhatsAppUrl(payload: BookingWhatsAppPayload): string {
  const text =
    `*🚨 NEW BOOKING ALERT - DUSAB BEAUTY PALOUR*\n` +
    `-----------------------------------------\n` +
    `*Customer Name:* ${payload.customerName}\n` +
    `*Phone Number:* ${payload.phoneNumber}\n` +
    `*Service/Training Booked:* ${payload.service}\n` +
    `*Preferred Date & Time:* ${payload.preferredDate} / ${payload.preferredTime}\n` +
    `\n` +
    `*Total Fee:* GH₵ ${payload.amount}\n` +
    `-----------------------------------------\n` +
    `*Proof of Payment Receipt:* ${payload.receiptUrl}\n` +
    `\n` +
    `_I await your confirmation, Artist!_`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Confirmation — sent TO customer when admin confirms the booking */
export function buildConfirmationWhatsAppUrl(payload: {
  customerName: string;
  customerPhone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  amount: number;
}): string {
  const intlPhone = payload.customerPhone.replace(/^0/, "233");

  const text =
    `*✅ BOOKING CONFIRMED - DUSAB BEAUTY PALOUR*\n` +
    `-----------------------------------------\n` +
    `Hi ${payload.customerName}! 🎉\n` +
    `\n` +
    `Your booking has been *confirmed*!\n` +
    `\n` +
    `*Service:* ${payload.service}\n` +
    `*Date:* ${payload.preferredDate}\n` +
    `*Time:* ${payload.preferredTime}\n` +
    `*Amount:* GH₵ ${payload.amount}\n` +
    `\n` +
    `We look forward to serving you. Please arrive 10 minutes early.\n` +
    `\n` +
    `Thank you for choosing *Dusab Beauty Palour*! 💄\n` +
    `\n` +
    `*Dusab Beauty Palour | Kumasi | @dusab_beauty*`;

  return `https://wa.me/${intlPhone}?text=${encodeURIComponent(text)}`;
}
