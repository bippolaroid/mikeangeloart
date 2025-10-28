import { A } from "@solidjs/router";

export const Tag = ({ children, href }: { children: string; href: string }) => {
  return (
    <A
      href={href}
      class="def__animate w-fit text-xs px-3 py-1 rounded-full text-nowrap bg-white/50 dark:bg-white/5 border dark:border-white/20 border-black/25 dark:text-white/20 text-black/50 hover:opacity-50 text-center"
    >
      {children}
    </A>
  );
};

export const ContainerLabel = ({ children }: { children: string }) => {
  return (
    <span class="font-bold text-xs tracking-widest uppercase">
      {children}
    </span>
  );
};
