export function VisitorCard({ name, phone, date, companions }) {
  return (
    <div className="bg-white rounded shadow border p-4 w-full max-w-sm">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Visitor Details</h3>
        <button className="text-red-500">🗑️</button>
      </div>
      <div className="mt-2 space-y-2 text-sm text-gray-700">
        <p>👤 {name}</p>
        <p>📞 {phone}</p>
        <p>📅 {date}</p>
        <p>👥 {companions}</p>
      </div>
      <button className="mt-3 w-full border-t pt-2 text-blue-700 text-sm">
        📱 Share QR Code to Visitor
      </button>
    </div>
  );
}
