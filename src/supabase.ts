import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://uyntdmqyfidjrrnnimrs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5bnRkbXF5ZmlkanJybm5pbXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NjA5MDgsImV4cCI6MjA5NjQzNjkwOH0.E3jGehPC2KiJF2x66GItmwnsc3WUKRWcKmTDa7Xnulc"
);
