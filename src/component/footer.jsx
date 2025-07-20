export function Footer({ github, linkedin }) {
  return (
    <div className="absolute right-0 left-0 flex items-center">
      <div className="flex flex-row items-center gap-5">
        <i>{github}</i>
        <i>{linkedin}</i>
      </div>
      <h2 className="text-blue-200">Felipe Carvalho @2025</h2>
    </div>
  );
}
