export function AdminLoadingScreen({ message = "Memuat…" }: { message?: string }) {
  return (
    <div className="flex h-screen items-center justify-center bg-[#F0F4FA]">
      <div className="flex flex-col items-center gap-3">
        <div className="size-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        <p className="text-sm text-slate-500">{message}</p>
      </div>
    </div>
  )
}
