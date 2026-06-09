import { defineConfig } from "prisma/config";

// Load environment variables natively in Node 20.6+
try {
  process.loadEnvFile();
} catch (e) {
  // env loading handled by host if absent
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "node prisma/seed.js",
  },
});
