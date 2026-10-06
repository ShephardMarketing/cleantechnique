/**
 * Renders a JSON-LD block. Kept in a component so every page emits structured
 * data the same way and the escaping is handled in one place.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify output is safe here; the `<` escape guards against
          // a stray closing tag if content ever contains markup.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  );
}
