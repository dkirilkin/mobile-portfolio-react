export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15M13 5l7 7-7 7"} /></svg>;
}
