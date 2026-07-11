'use client';
/**
 * React Router → Next.js compatibility shim.
 * Lets the existing component tree keep using `<Link to=...>`, `useLocation`,
 * `useNavigate`, `useParams` and `useSearchParams` while running on the Next.js
 * App Router. Only the import path changes ('react-router-dom' → '@/lib/router').
 */
import React from 'react';
import NextLink from 'next/link';
import {
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
  useParams as useNextParams,
} from 'next/navigation';

type LinkProps = Omit<React.ComponentProps<typeof NextLink>, 'href'> & {
  to: string;
  replace?: boolean;
  // react-router allowed state/relative props we can safely ignore
  state?: unknown;
};

/** `<Link to="/x">` → Next `<Link href="/x">`. */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, replace, state, ...rest },
  ref
) {
  return <NextLink ref={ref} href={to} replace={replace} {...rest} />;
});

/**
 * react-router `useLocation()` shape backed by Next hooks.
 * NOTE: intentionally does NOT call useSearchParams() — doing so would force
 * every consumer (e.g. the always-mounted Navbar) to sit inside a Suspense
 * boundary during static export. `search`/`hash` are read from `window` at
 * runtime instead (empty during SSR, which is fine for our consumers).
 */
export function useLocation() {
  const pathname = usePathname() || '/';
  return {
    pathname,
    search: typeof window !== 'undefined' ? window.location.search : '',
    hash: typeof window !== 'undefined' ? window.location.hash : '',
    state: null as unknown,
    key: 'default',
  };
}

/** react-router `useNavigate()` → function that pushes/replaces routes. */
export function useNavigate() {
  const router = useRouter();
  return (to: string | number, opts?: { replace?: boolean }) => {
    if (typeof to === 'number') {
      if (typeof window !== 'undefined') window.history.go(to);
      return;
    }
    if (opts?.replace) router.replace(to);
    else router.push(to);
  };
}

/** Pass-through — Next's useParams returns the dynamic segment map. */
export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  return (useNextParams() as unknown as T) ?? ({} as T);
}

/**
 * react-router `useSearchParams()` returns a [params, setParams] tuple.
 * Next's returns only the params, so we synthesize a setter using the router.
 */
export function useSearchParams(): [
  URLSearchParams,
  (next: URLSearchParams | Record<string, string>, opts?: { replace?: boolean }) => void
] {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const current = useNextSearchParams();
  const params = new URLSearchParams(current?.toString() ?? '');

  const setParams = (
    next: URLSearchParams | Record<string, string>,
    opts?: { replace?: boolean }
  ) => {
    const usp = next instanceof URLSearchParams ? next : new URLSearchParams(next);
    const qs = usp.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    if (opts?.replace) router.replace(url, { scroll: false });
    else router.push(url, { scroll: false });
  };

  return [params, setParams];
}
