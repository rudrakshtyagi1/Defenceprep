interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** A word or phrase within `title` that receives gradient-accent styling */
  accent?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  title,
  subtitle,
  accent,
  align = 'center',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  const renderTitle = () => {
    if (!accent) return <span>{title}</span>;

    const index = title.indexOf(accent);
    if (index === -1) return <span>{title}</span>;

    const before = title.slice(0, index);
    const after = title.slice(index + accent.length);

    return (
      <>
        {before}
        <span className="gradient-accent">{accent}</span>
        {after}
      </>
    );
  };

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      <h2 className="text-3xl sm:text-4xl font-bold text-dp-primary leading-tight tracking-tight">
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className="text-dp-secondary text-base sm:text-lg leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
