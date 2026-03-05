type ResultListProps = {
  results: string[];
};

export default function ResultList({ results }: ResultListProps) {
  if (!results.length) {
    return null;
  }

  return (
    <div className="card p-5">
      <h3 className="text-base font-semibold text-slate-900">Generated Results</h3>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {results.map((item, index) => (
          <li key={`${item}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <span className="mr-2 font-semibold text-brand-700">{index + 1}.</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
