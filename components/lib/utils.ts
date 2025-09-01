// Simple utility to merge Tailwind classes, akin to `tailwind-merge`
export const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');
