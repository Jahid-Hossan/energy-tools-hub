export const siteConfig = {
  name: "Energy Tools Hub",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.NODE_ENV === "production" ? "https://your-final-domain.example" : "http://localhost:3000"),
  contactEmail: "hello@energytoolshub.com",
} as const;
