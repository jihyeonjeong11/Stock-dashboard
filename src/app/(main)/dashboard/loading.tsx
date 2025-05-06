// todo: make it real

export default function Loading() {
  return (
    <section className="flex flex-col flex-1">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />{" "}
        {/* Company name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[200px] bg-gray-200 rounded-lg" />
          ))}
        </div>
        <div className="h-[400px] bg-gray-200 rounded-lg mt-8" /> {/* Chart */}
      </div>
    </section>
  );
}
