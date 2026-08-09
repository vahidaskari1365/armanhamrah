import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Ensures password-recovery links always land on the correct reset screen.
 * Some providers/auth flows may redirect to the site root with recovery params.
 */
export default function AuthRecoveryRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Use window.location to reliably read both search + hash (router location is split).
    const url = new URL(window.location.href);

    const type = url.searchParams.get("type");
    const isRecovery =
      type === "recovery" ||
      url.hash.includes("type=recovery") ||
      url.hash.includes("&type=recovery") ||
      url.hash.includes("type=recover");

    const hasCode = url.searchParams.has("code");

    // If we have recovery indicators but we're not on the reset page, redirect.
    if (isRecovery && location.pathname !== "/admin/reset-password") {
      navigate(
        {
          pathname: "/admin/reset-password",
          search: location.search,
          hash: location.hash,
        },
        { replace: true }
      );
      return;
    }

    // PKCE flow sometimes comes with ?code=... and type may not be present in search.
    // If a code exists alongside a recovery-ish hash, also redirect.
    if (hasCode && url.hash.includes("recovery") && location.pathname !== "/admin/reset-password") {
      navigate(
        {
          pathname: "/admin/reset-password",
          search: location.search,
          hash: location.hash,
        },
        { replace: true }
      );
    }
  }, [location.hash, location.pathname, location.search, navigate]);

  return null;
}
