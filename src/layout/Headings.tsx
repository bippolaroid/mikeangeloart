import { JSX } from "solid-js";

export const H1 = (props: { children: JSX.Element }) => {
  return (
    <h1 class="leading-tight text-4xl md:text-5xl text-black dark:text-white font-semibold tracking-tighter">
      {props.children}
    </h1>
  );
};

export const H2 = ({ children }: { children: string }) => {
  return <h2 class="font-semibold text-2xl text-black dark:text-white">{children}</h2>;
};
