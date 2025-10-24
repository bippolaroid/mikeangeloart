export const H1 = ({ children }: { children: string }) => {
  return (
    <h1 class="text-4xl md:text-5xl text-black font-bold tracking-tighter">
      {children}
    </h1>
  );
};

export const H2 = ({ children }: { children: string }) => {
  return <h2 class="font-bold text-2xl">{children}</h2>;
};
