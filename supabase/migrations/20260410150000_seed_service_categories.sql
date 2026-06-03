-- Ensure service_categories supports production category metadata
-- and seed default luxury categories.

ALTER TABLE public.service_categories
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;

-- Keep sort_order/created_at from initial schema; ensure names/slugs are present.
INSERT INTO public.service_categories (name, slug, description, is_active, sort_order)
VALUES
  ('General', 'general', 'Fallback category for uncategorized services.', true, 0),
  ('Facials', 'facials', 'Advanced facial treatments for skin renewal.', true, 10),
  ('Hair Styling', 'hair-styling', 'Editorial and everyday hair styling services.', true, 20),
  ('Hair Treatments', 'hair-treatments', 'Repair, hydration, and scalp-focused treatments.', true, 30),
  ('Makeup', 'makeup', 'Occasion, editorial, and luxury makeup artistry.', true, 40),
  ('Nails', 'nails', 'Manicure, pedicure, and nail care rituals.', true, 50),
  ('Massage Therapy', 'massage-therapy', 'Relaxation and therapeutic massage services.', true, 60),
  ('Body Treatments', 'body-treatments', 'Body scrubs, wraps, and skin treatments.', true, 70),
  ('Waxing', 'waxing', 'Professional waxing and hair removal services.', true, 80),
  ('Bridal Services', 'bridal-services', 'Bridal beauty prep and wedding day packages.', true, 90),
  ('Brows & Lashes', 'brows-lashes', 'Brow shaping, tinting, and lash enhancement.', true, 100),
  ('Spa Packages', 'spa-packages', 'Bundled premium spa and wellness experiences.', true, 110),
  ('Wellness', 'wellness', 'Holistic wellness and restorative offerings.', true, 120),
  ('Men''s Grooming', 'mens-grooming', 'Tailored grooming services for men.', true, 130),
  ('Skin Care', 'skin-care', 'Targeted skincare services and consultations.', true, 140),
  ('Premium Packages', 'premium-packages', 'High-end curated luxury service bundles.', true, 150)
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  sort_order = EXCLUDED.sort_order;

