export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow bg-white">
      <div className="flex items-center gap-2">
        <div className="bg-blue-100 p-2 rounded-full">
          <span role="img" aria-label="shield">
            🛡️
          </span>
        </div>
        <nav className="ml-4 space-x-4">
          <button className="text-blue-500 font-semibold">Home</button>
          <button className="text-gray-500">My Visitors</button>
          <button className="text-gray-500">Notifications</button>
        </nav>
      </div>
      <div className="flex gap-3 items-center">
        <button className="border rounded px-2 py-1 text-sm">
          Jan 12, 2024
        </button>
        <button className="bg-blue-700 text-white px-4 py-2 rounded">
          + New Visitor
        </button>
        <img
          src="/profile.jpg"
          className="w-8 h-8 rounded-full"
          alt="Profile"
        />
      </div>
    </header>
  );
}
