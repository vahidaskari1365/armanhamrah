-- Final Troubleshooting Script for Row Level Security (RLS)
-- This script temporarily disables RLS on all related tables to diagnose the infinite loading issue.
-- This is a diagnostic step. A permanent fix will involve creating proper read policies.

BEGIN;

-- Disable RLS on all three tables involved in the product query.
-- A misconfiguration here is the most likely cause for a hanging query.
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;

COMMIT;
