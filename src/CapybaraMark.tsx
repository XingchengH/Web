export default function CapybaraMark({ className = '' }: { className?: string }) {
  return (
    <span className={`capybara-mark ${className}`} aria-hidden="true">
      <svg viewBox="0 0 78 44" focusable="false">
        <path className="capybara-mark-body" d="M5 27.5C5 18.2 12.8 12 23.8 12c8.7 0 14.2 3.7 21.2 3.7 5.2 0 8.1-6.7 14-6.7 8.1 0 14 6.8 14 15.2C73 32 66.6 36 57.5 36H18.7C10.4 36 5 32.6 5 27.5Z" />
        <circle className="capybara-mark-ear" cx="59.5" cy="10.2" r="4.2" />
        <circle className="capybara-mark-eye" cx="65" cy="17.5" r="1.55" />
        <circle className="capybara-mark-nose" cx="72.5" cy="24.3" r="1.9" />
        <path className="capybara-mark-line" d="M14.5 32.8v6.1m24.5-5.8v5.8m31.7-10.2c-3.2 1.3-6.2 1.1-8.8-.2M22 19.5l-2.8 2.2m9.1-3.8-2.2 2.7" />
      </svg>
    </span>
  )
}
