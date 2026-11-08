/**
 * The heading block above every section: small uppercase label, heavy title,
 * one line of explanation. Shared so the rhythm is identical on every page.
 */
export function SectionHeader({
  label,
  title,
  text,
  dark = false,
  align = "center",
}: {
  label: string;
  title: string;
  text?: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  const centred = align === "center";
  return (
    <header className={`mb-14 ${centred ? "text-center" : ""}`}>
      <p className={`section-label ${dark ? "text-accent-light" : ""}`}>{label}</p>
      <h2 className="mt-3 text-[1.75rem] font-black leading-tight tracking-[-0.5px] sm:text-[2.5rem]">
        {title}
      </h2>
      {text ? (
        <p
          className={`mt-4 max-w-2xl ${centred ? "mx-auto" : ""} ${
            dark ? "text-white/60" : "text-gray-600"
          }`}
        >
          {text}
        </p>
      ) : null}
    </header>
  );
}
