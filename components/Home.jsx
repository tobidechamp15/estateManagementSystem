import Header from "../components/Header";
import { VisitorCard } from "../components/VisitorCard";
import { VisitorStats } from "../components/VisitorStats";
import { DateFilter } from "../components/DateFilter";

export default function Home() {
  const visitors = [
    {
      name: "Oluwaseun Awosola",
      phone: "08024584922",
      date: "12 - 01 - 2024",
      companions: 0,
    },
    {
      name: "Micheal Scofield",
      phone: "07026637811",
      date: "13 - 01 - 2024",
      companions: 2,
    },
    {
      name: "Darasimi Deborah",
      phone: "08029936885",
      date: "14 - 01 - 2024",
      companions: 0,
    },
  ];

  return (
    <main className="bg-gray-100 min-h-screen font-sans">
      <Header />
      <section className="p-4">
        <h1 className="text-2xl font-bold mb-1">Hello 👋</h1>
        <p className="text-sm text-gray-600 mb-4">
          Ready to manage who comes through your gate?
        </p>
        <VisitorStats total={18} upcoming={8} />
        <DateFilter />
        <div className="flex flex-wrap gap-4 p-4 justify-start">
          {visitors.map((visitor, index) => (
            <VisitorCard key={index} {...visitor} />
          ))}
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">
          Remember to share the QR code with your visitor before their arrival
        </p>
        <div className="flex justify-center mt-4">
          <button className="bg-blue-700 text-white px-4 py-2 rounded">
            + New Visitor
          </button>
        </div>
      </section>
    </main>
  );
}
