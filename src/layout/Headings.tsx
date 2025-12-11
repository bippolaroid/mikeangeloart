import { JSX } from "solid-js";

export const H1 = (props: { children: JSX.Element }) => {
  return (
    <h1 class="leading-tight text-4xl md:text-6xl text-black dark:text-white font-semibold">
      {props.children}
    </h1>
  );
};

export const H2 = (props: {children: JSX.Element }) => {
  return <h2 class="font-semibold text-2xl text-black dark:text-white">{props.children}</h2>;
};
