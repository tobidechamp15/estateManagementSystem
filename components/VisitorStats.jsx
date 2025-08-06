export function VisitorStats({ total, upcoming }) {
  return (
    <section className="grid sm:grid-cols-2 gap-4 p-4">
      <div className="bg-white p-4 rounded shadow border">
        <p>Total visitors</p>
        <h2 className="text-xl font-bold">{total}</h2>
        <p className="text-green-600 text-sm">⬆ 10%</p>
        <span className="text-sm text-gray-500">All time</span>
      </div>
      <div className="bg-white p-4 rounded shadow border">
        <p>Upcoming Visits</p>
        <h2 className="text-xl font-bold">{upcoming}</h2>
        <p className="text-green-600 text-sm">⬆ 12%</p>
        <button className="text-sm text-right mt-2 text-gray-600">
          View all
        </button>
      </div>
    </section>
  );
}
