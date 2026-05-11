export default function BookingLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 pb-16">
        
        {/* Stepper Skeleton */}
        <div className="flex items-center justify-center py-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                <div className="w-12 h-3 rounded bg-gray-200 animate-pulse" />
              </div>
              {i < 3 && (
                <div className="w-20 sm:w-28 h-0.5 mx-2 mb-5 bg-gray-200 animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Kiri */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-200 animate-pulse" />
                <div className="flex flex-col gap-1.5">
                  <div className="w-24 h-3.5 rounded bg-gray-200 animate-pulse" />
                  <div className="w-36 h-3 rounded bg-gray-200 animate-pulse" />
                </div>
              </div>
              <div className="w-full h-16 rounded-xl bg-gray-100 animate-pulse" />
              <div className="w-full h-40 rounded-xl bg-gray-200 animate-pulse" />
              <div className="w-full h-12 rounded-xl bg-gray-100 animate-pulse" />
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3">
              <div className="w-32 h-4 rounded bg-gray-200 animate-pulse" />
              {[1, 2].map((i) => (
                <div key={i} className="w-full h-14 rounded-xl bg-gray-100 animate-pulse" />
              ))}
            </div>
          </div>

          {/* Kanan */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
              <div className="w-36 h-4 rounded bg-gray-200 animate-pulse" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="w-28 h-3.5 rounded bg-gray-200 animate-pulse" />
                  <div className="w-16 h-3.5 rounded bg-gray-200 animate-pulse" />
                </div>
              ))}
              <div className="border-t border-dashed border-gray-200" />
              <div className="flex justify-between">
                <div className="w-20 h-4 rounded bg-gray-200 animate-pulse" />
                <div className="w-24 h-4 rounded bg-gray-200 animate-pulse" />
              </div>
              <div className="w-full h-11 rounded-xl bg-blue-100 animate-pulse mt-1" />
              <div className="w-full h-11 rounded-xl bg-gray-100 animate-pulse" />
              <div className="w-full h-14 rounded-xl bg-gray-50 animate-pulse" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}