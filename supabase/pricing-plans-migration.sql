-- One-time migration: replaces the old Starter/Professional/Premium pricing
-- record with the current two plans and six configured INR prices.
insert into public.studio_content (key, value, updated_at)
values (
  'packages',
  '[
    {
      "name": "Single Plan",
      "durations": [
        { "months": 12, "price": 5299 },
        { "months": 24, "price": 6399 },
        { "months": 48, "price": 6999 }
      ],
      "domainHostingIncluded": false
    },
    {
      "name": "Premium Plan",
      "durations": [
        { "months": 12, "price": 7499 },
        { "months": 24, "price": 8999 },
        { "months": 48, "price": 14999 }
      ],
      "domainHostingIncluded": true,
      "featured": true
    }
  ]'::jsonb,
  now()
)
on conflict (key) do update
set value = excluded.value, updated_at = excluded.updated_at;
