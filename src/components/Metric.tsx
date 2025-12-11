export const Metric = ({ children, icon }: { children: string; icon: string }) => {
    return (
        <article class="flex items-center gap-3">
            <div class="border border-black/50 dark:border-white/50 p-1 rounded-lg opacity-20">
                <img src={icon} loading="eager" class="w-8 h-8 dark:invert" />
            </div>
            <span class="uppercase text-xs font-bold tracking-widest text-black/20 dark:text-white/20">
                {children}
            </span>
        </article>
    );
};