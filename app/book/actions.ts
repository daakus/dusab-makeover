"use server";

import { createClient } from "@/supabase/server";
import { MOMO_SERVICES } from "@/lib/constants/momo-services";

export async function submitBooking(formData: FormData) {
  const customerName  = formData.get("customer_name") as string;
  const phoneNumber   = formData.get("phone_number")  as string;
  const serviceId     = formData.get("service")       as string;
  const preferredDate = formData.get("preferred_date") as string;
  const preferredTime = formData.get("preferred_time") as string;
  const receipt       = formData.get("receipt")        as File | null;

  if (!customerName || !phoneNumber || !serviceId || !preferredDate || !preferredTime || !receipt) {
    return { error: "All fields including the payment receipt are required." };
  }

  const service = MOMO_SERVICES.find((s) => s.id === serviceId);
  if (!service) return { error: "Invalid service selected." };

  const supabase = await createClient();

  // Upload receipt to Supabase Storage
  const ext      = receipt.name.split(".").pop() ?? "jpg";
  const filename = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const buffer   = Buffer.from(await receipt.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from("receipts")
    .upload(filename, buffer, { contentType: receipt.type, upsert: false });

  if (uploadError) return { error: `Receipt upload failed: ${uploadError.message}` };

  // Signed URL (1 year) — opens on any phone/browser without Supabase login
  const ONE_YEAR_SECS = 60 * 60 * 24 * 365;
  const { data: signedData } = await supabase.storage
    .from("receipts")
    .createSignedUrl(filename, ONE_YEAR_SECS);
  const receiptUrl = signedData?.signedUrl ?? "";

  // Save booking to DB
  const { data: booking, error: dbError } = await supabase
    .from("bookings")
    .insert({
      customer_name:  customerName,
      phone_number:   phoneNumber,
      service:        service.label,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      amount:         service.price,
      receipt_url:    receiptUrl,
      status:         "pending",
    })
    .select("id")
    .single();

  if (dbError) return { error: `Booking save failed: ${dbError.message}` };

  // Return data so client can build the WhatsApp URL and redirect
  return {
    success:    true  as const,
    bookingId:  booking.id,
    receiptUrl,
    service:    service.label,
    amount:     service.price,
  };
}
