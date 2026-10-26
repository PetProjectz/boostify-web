'use client';

/**
 * `next/link` re-exported across a client boundary. Server Components that pass
 * the link as MUI's `component` prop must import it from here: since Next 16,
 * `next/link` resolves to a server-side wrapper function in Server Components,
 * which React can't serialize as a prop to a Client Component.
 */
export { default } from 'next/link';
