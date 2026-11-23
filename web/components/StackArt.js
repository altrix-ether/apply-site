function Glyph({ d }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const layers = [
  {
    tone: "gold",
    title: "Decisions",
    icon: "M12 3l2.2 6.6H21l-5.4 4 2.1 6.4L12 16.8 6.3 20l2.1-6.4L3 9.6h6.8L12 3z",
  },
  {
    tone: "blue",
    title: "Workflows",
    word: true,
    icon: "M4 7h10M4 12h16M4 17h7",
  },
  {
    tone: "pink",
    title: "Context",
    icon: "M12 21a9 9 0 1 0-9-9c0 2.2.8 4.2 2.1 5.8L4 21l3.4-1.2A8.9 8.9 0 0 0 12 21z",
  },
  {
    tone: "teal",
    title: "Data",
    icon: "M4 7c0-2 3.6-3 8-3s8 1 8 3-3.6 3-8 3-8-1-8-3zM4 7v10c0 2 3.6 3 8 3s8-1 8-3V7M4 12c0 2 3.6 3 8 3s8-1 8-3",
  },
];

export default function StackArt() {
  return (
    <div className="stack" aria-hidden="true">
      {layers.map((layer) => (
        <div key={layer.title} className={`layer layer-${layer.tone}`}>
          <span className="dot">
            <Glyph d={layer.icon} />
          </span>
          {layer.word ? <span className="layer-word">Alteryx</span> : <strong>{layer.title}</strong>}
          <span className="glyphs">
            <Glyph d="M4 18V6M10 18V10M16 18V4M22 18H2" />
          </span>
        </div>
      ))}
    </div>
  );
}
