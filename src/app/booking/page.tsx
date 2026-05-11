import BookingSteps from "@/components/booking/BookingSteps";
import DropOffStep from "@/components/booking/DropOffStep";
import OrderSummary from "@/components/booking/OrderSummary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 pb-16">
          {/* Stepper */}
          <BookingSteps />

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Kiri: konten step */}
            <div className="lg:col-span-3">
              <DropOffStep />
            </div>

            {/* Kanan: order summary */}
            <div className="lg:col-span-2">
              <OrderSummary />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}