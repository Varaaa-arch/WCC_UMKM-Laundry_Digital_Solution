"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User, MapPin, Settings2, LogOut, Pencil, Plus, MoreVertical, ShieldCheck, Star } from "lucide-react"
import DashboardShell from "@/components/layout/DashboardShell"
import { useAuthStore } from "@/store/useAuthStore"
import { signOut } from "@/actions/auth-action"
import { useOrders } from "@/hooks/useOrder"

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading: authLoading, init } = useAuthStore()
  const { orders } = useOrders()

  const [fullName, setFullName] = useState(() => (user?.user_metadata?.full_name as string) ?? "")
  const [phone, setPhone]       = useState(() => (user?.user_metadata?.phone as string) ?? "")
  const [pushNotif, setPush]    = useState(true)
  const [emailPromo, setPromo]  = useState(false)
  const [saved, setSaved]       = useState(false)
  const [showModal, setModal]   = useState(false)
  const [addresses, setAddresses] = useState([
    { id: 1, name: "Rumah",  addr: "Jl. Sudirman No. 123, Jakarta Pusat, 10220", isDefault: true },
    { id: 2, name: "Kantor", addr: "Gedung Perkantoran Tower B, Lt 5, Jakarta Selatan", isDefault: false },
  ])
  const [newLabel, setNewLabel] = useState("")
  const [newAddr, setNewAddr]   = useState("")

  useEffect(() => { const u = init(); return u }, [init])
  useEffect(() => {
    if (!authLoading && !user) router.replace("/login")
  }, [authLoading, user, router])

  if (authLoading || !user) return null

  const displayName =
    fullName || user.email?.split("@")[0] || "User"
  const initials   = fullName ? fullName.slice(0, 2).toUpperCase() : (user.email?.[0]?.toUpperCase() ?? "U")
  const doneOrders = orders.filter(o => ["delivered","finished"].includes(o.status))
  const loyaltyPts = doneOrders.length * 50

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  const handleLogout = async () => { await signOut(); router.replace("/") }
  const handleAddAddress = () => {
    if (!newLabel.trim() || !newAddr.trim()) return
    setAddresses(prev => [...prev, { id: Date.now(), name: newLabel.trim(), addr: newAddr.trim(), isDefault: false }])
    setNewLabel(""); setNewAddr(""); setModal(false)
  }

  return (
    <DashboardShell
      title="Profil & Pengaturan"
      subtitle="Kelola detail akun dan preferensi kamu"
      userName={displayName}
    >
      <div className="space-y-5 p-4 sm:p-6">

        {/* Top: Avatar banner */}
        <div className="bg-linear-to-r from-blue-600 to-blue-500 rounded-2xl p-6 flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-2xl ring-4 ring-white/30">
              {initials}
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
              <Pencil className="w-3 h-3 text-blue-600" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-lg leading-tight truncate">{fullName || "Pengguna"}</p>
            <p className="text-blue-100 text-sm">{user.email}</p>
            <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3" /> Member
            </span>
          </div>
          {/* Stats */}
          <div className="hidden sm:flex items-center gap-6 shrink-0">
            <div className="text-center">
              <p className="text-white font-bold text-xl">{orders.length}</p>
              <p className="text-blue-100 text-xs">Total Order</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-white font-bold text-xl">{loyaltyPts}</p>
              <p className="text-blue-100 text-xs">Poin</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-white font-bold text-xl">{doneOrders.length}</p>
              <p className="text-blue-100 text-xs">Selesai</p>
            </div>
          </div>
        </div>

        {/* Grid 3 col */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Personal Info */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-blue-500" />
              </div>
              <h2 className="font-semibold text-gray-900">Informasi Pribadi</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block font-medium">Nama Lengkap</label>
                <input value={fullName} onChange={e => setFullName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block font-medium">Nomor Telepon</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+62 812 3456 7890"
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs text-gray-500 mb-1.5 block font-medium">Alamat Email</label>
                <input value={user.email ?? ""} disabled
                  className="w-full border border-gray-100 rounded-xl px-3.5 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <button onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                {saved ? "Tersimpan ✓" : "Simpan Perubahan"}
              </button>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                Data kamu aman & terenkripsi
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                <Settings2 className="w-4 h-4 text-purple-500" />
              </div>
              <h2 className="font-semibold text-gray-900">Preferensi</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: "Notifikasi Push", desc: "Update status laundry real-time.", val: pushNotif, set: setPush },
                { label: "Promo Email",     desc: "Info diskon & penawaran spesial.", val: emailPromo, set: setPromo },
              ].map(({ label, desc, val, set }) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                  </div>
                  <button onClick={() => set(!val)}
                    className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${val ? "bg-blue-500" : "bg-gray-200"}`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${val ? "left-[22px]" : "left-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100">
              <button onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 text-sm text-red-500 font-medium hover:bg-red-50 py-2.5 rounded-xl transition-colors border border-red-100"
              >
                <LogOut className="w-4 h-4" /> Keluar dari Akun
              </button>
            </div>
          </div>

          {/* Saved Addresses - full width */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-green-500" />
                </div>
                <h2 className="font-semibold text-gray-900">Alamat Tersimpan</h2>
              </div>
              <button onClick={() => setModal(true)} className="flex items-center gap-1.5 text-sm text-blue-600 font-medium hover:underline">
                <Plus className="w-3.5 h-3.5" /> Tambah Alamat
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {addresses.map(({ id, name, addr, isDefault }) => (
                <div key={id} className={`flex items-start justify-between p-4 rounded-xl border transition-colors ${isDefault ? "border-blue-200 bg-blue-50/40" : "border-gray-100 bg-gray-50/40"}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${isDefault ? "bg-blue-100" : "bg-gray-100"}`}>
                      <MapPin className={`w-4 h-4 ${isDefault ? "text-blue-500" : "text-gray-400"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">{name}</p>
                        {isDefault && <span className="text-[10px] bg-blue-100 text-blue-600 font-bold px-1.5 py-0.5 rounded-full">Default</span>}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{addr}</p>
                    </div>
                  </div>
                  <button onClick={() => setAddresses(prev => prev.filter(a => a.id !== id))}
                    className="text-gray-300 hover:text-red-400 shrink-0 ml-2 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Modal Tambah Alamat */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="font-bold text-gray-900 text-lg mb-1">Tambah Alamat Baru</h3>
            <p className="text-gray-400 text-sm mb-5">Isi detail alamat pengiriman kamu.</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1.5 block">Label Alamat</label>
                <input value={newLabel} onChange={e => setNewLabel(e.target.value)}
                  placeholder="cth: Rumah, Kantor, Kos..."
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1.5 block">Alamat Lengkap</label>
                <textarea value={newAddr} onChange={e => setNewAddr(e.target.value)}
                  placeholder="Jl. Contoh No. 1, Kota, Kode Pos"
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => { setModal(false); setNewLabel(""); setNewAddr("") }}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >Batal</button>
              <button onClick={handleAddAddress} disabled={!newLabel.trim() || !newAddr.trim()}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 disabled:bg-blue-300 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
              >Simpan Alamat</button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
