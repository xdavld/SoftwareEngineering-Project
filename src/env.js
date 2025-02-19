import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";





export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    UPLOADTHING_TOKEN: z.string().min(1),
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
    INSTAGRAM_ACCESS_TOKEN: z.string().min(1),
    INSTAGRAM_APP_ID: z.string().min(1),
    INSTAGRAM_CLIENT_SECRET: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
    INSTAGRAM_CLIENT_ID: z.string().min(1),
    INSTAGRAM_REDIRECT_URI: z.string().url(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * ⁠ NEXT_PUBLIC_ ⁠.
   */
  client: {
    NEXT_PUBLIC_NODE_ENV: z.enum(["development", "test", "production"]),
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  },

  /**
   * You can't destruct ⁠ process.env ⁠ as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN,
    INSTAGRAM_APP_ID: process.env.INSTAGRAM_APP_ID,
    INSTAGRAM_CLIENT_SECRET: process.env.INSTAGRAM_CLIENT_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    INSTAGRAM_CLIENT_ID: process.env.INSTAGRAM_CLIENT_ID,
    INSTAGRAM_REDIRECT_URI: process.env.INSTAGRAM_REDIRECT_URI,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  /**
   * Run ⁠ build ⁠ or ⁠ dev ⁠ with ⁠ SKIP_ENV_VALIDATION ⁠ to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. ⁠ SOME_VAR: z.string() ⁠ and
   * ⁠ SOME_VAR='' ⁠ will throw an error.
   */
  emptyStringAsUndefined: true,
})