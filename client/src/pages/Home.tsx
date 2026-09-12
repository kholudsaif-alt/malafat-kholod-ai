import { useMemo, useState } from "react";
import {
  Archive,
  ArrowDownToLine,
  ChevronDown,
  ChevronLeft,
  Clock3,
  Cloud,
  CloudDownload,
  Copy,
  Ellipsis,
  File,
  FileArchive,
  FileCode2,
  FileImage,
  FileSpreadsheet,
  FileText,
  Folder,
  FolderOpen,
  Grid2X2,
  HardDrive,
  Image as ImageIcon,
  LayoutDashboard,
  List,
  LogOut,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Share2,
  ShieldCheck,
  Star,
  Trash2,
  UploadCloud,
  Users,
  X,
  Zap,
} from "lucide-react";
import { filterDriveItems, toggleDriveSelection } from "@/lib/driveflow";

type FileType = "folder" | "pdf" | "sheet" | "image" | "doc" | "zip" | "code";
type DriveFile = {
  id: number;
  name: string;
  type: FileType;
  size: string;
  modified: string;
  owner: string;
  shared?: boolean;
  favorite?: boolean;
  color: string;
};

const files: DriveFile[] = [
  { id: 1, name: "مجلد المشاريع", type: "folder", size: "—", modified: "اليوم، 10:24 ص", owner: "أنت", shared: true, color: "coral" },
  { id: 2, name: "Brand Guidelines 2024.pdf", type: "pdf", size: "8.4 MB", modified: "اليوم، 09:12 ص", owner: "أنت", favorite: true, color: "red" },
  { id: 3, name: "خطة المحتوى - Q3", type: "sheet", size: "2.1 MB", modified: "أمس، 04:45 م", owner: "سارة أحمد", shared: true, color: "green" },
  { id: 4, name: "صور الحملة الصيفية", type: "folder", size: "—", modified: "أمس، 02:18 م", owner: "أنت", shared: true, color: "orange" },
  { id: 5, name: "Proposal - Acme Corp.docx", type: "doc", size: "1.8 MB", modified: "12 سبتمبر 2024", owner: "محمد علي", color: "blue" },
  { id: 6, name: "Website Assets.zip", type: "zip", size: "124.7 MB", modified: "11 سبتمبر 2024", owner: "أنت", favorite: true, color: "amber" },
  { id: 7, name: "analytics-dashboard.tsx", type: "code", size: "46 KB", modified: "10 سبتمبر 2024", owner: "أنت", color: "violet" },
  { id: 8, name: "لقطات المنتج النهائية", type: "image", size: "38.5 MB", modified: "09 سبتمبر 2024", owner: "ريم خالد", shared: true, color: "pink" },
];

const nav = [
  { label: "نظرة عامة", icon: LayoutDashboard },
  { label: "ملفاتي", icon: FolderOpen, active: true, count: "128" },
  { label: "المشاركة معي", icon: Users, count: "12" },
  { label: "المفضلة", icon: Star, count: "8" },
  { label: "المهملات", icon: Trash2 },
];

const iconColors: Record<string, string> = {
  coral: "text-orange-300",
  red: "text-red-400",
  green: "text-emerald-400",
  orange: "text-orange-400",
  blue: "text-sky-400",
  amber: "text-amber-400",
  violet: "text-violet-400",
  pink: "text-pink-400",
};

const surfaceColors: Record<string, string> = {
  coral: "bg-orange-400/[0.11]",
  red: "bg-red-400/[0.11]",
  green: "bg-emerald-400/[0.11]",
  orange: "bg-orange-400/[0.11]",
  blue: "bg-sky-400/[0.11]",
  amber: "bg-amber-400/[0.11]",
  violet: "bg-violet-400/[0.11]",
  pink: "bg-pink-400/[0.11]",
};

function FileIcon({ type, color = "orange" }: { type: FileType; color?: string }) {
  const common = "h-5 w-5";
  if (type === "folder") return <Folder className={`${common} ${iconColors[color] ?? iconColors.orange}`} />;
  if (type === "pdf") return <FileText className={`${common} text-red-400`} />;
  if (type === "sheet") return <FileSpreadsheet className={`${common} text-emerald-400`} />;
  if (type === "image") return <FileImage className={`${common} text-pink-400`} />;
  if (type === "doc") return <FileText className={`${common} text-sky-400`} />;
  if (type === "zip") return <FileArchive className={`${common} text-amber-400`} />;
  if (type === "code") return <FileCode2 className={`${common} text-violet-400`} />;
  return <File className={`${common} text-zinc-400`} />;
}

function formatStat(value: string) {
  return <span className="font-display">{value}</span>;
}

export default function Home() {
  const [view, setView] = useState<"grid" | "list">("list");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [activeNav, setActiveNav] = useState("ملفاتي");
  const [menuOpen, setMenuOpen] = useState(false);
  const [driveConnected, setDriveConnected] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredFiles = useMemo(() => filterDriveItems(files, query), [query]);

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const toggleSelect = (id: number) => {
    setSelected((current) => toggleDriveSelection(current, id));
  };

  const toggleAll = () => {
    setSelected(selected.length === filteredFiles.length ? [] : filteredFiles.map((file) => file.id));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#100d0d] text-white selection:bg-orange-500/30">
      <div className="fire-noise" />
      <div className="relative flex min-h-screen">
        <aside className={`fixed inset-y-0 right-0 z-40 w-[284px] border-l border-white/[0.07] bg-[#171010]/95 px-4 py-5 backdrop-blur-xl transition-transform lg:sticky lg:translate-x-0 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex h-full flex-col">
            <div className="mb-10 flex items-center gap-3 px-3">
              <div className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#ff784e] via-[#ed3d2f] to-[#8f1722] shadow-[0_10px_35px_rgba(244,63,37,.28)]">
                <Zap className="relative h-5 w-5 fill-white text-white" />
                <div className="absolute -bottom-5 h-10 w-10 rounded-full bg-white/20 blur-lg" />
              </div>
              <div>
                <div className="font-display text-lg font-bold tracking-tight">Drive<span className="text-orange-400">Flow</span></div>
                <div className="text-[11px] text-white/35">مساحة عملك، بشكل أذكى</div>
              </div>
              <button onClick={() => setMenuOpen(false)} className="mr-auto rounded-lg p-1 text-white/35 hover:bg-white/5 lg:hidden"><X className="h-5 w-5" /></button>
            </div>

            <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">مساحة العمل</div>
            <nav className="space-y-1">
              {nav.map((item) => {
                const Icon = item.icon;
                const active = activeNav === item.label;
                return <button key={item.label} onClick={() => { setActiveNav(item.label); notify(`تم فتح ${item.label}`); }} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all ${active ? "bg-gradient-to-l from-orange-500/20 to-red-500/10 text-orange-200 shadow-[inset_-2px_0_0_#ff633e]" : "text-white/50 hover:bg-white/[0.045] hover:text-white"}`}>
                  <Icon className={`h-[18px] w-[18px] ${active ? "text-orange-400" : "text-white/35 group-hover:text-orange-300"}`} />
                  <span>{item.label}</span>
                  {item.count && <span className={`mr-auto rounded-full px-2 py-0.5 text-[10px] ${active ? "bg-orange-400/15 text-orange-300" : "bg-white/5 text-white/30"}`}>{item.count}</span>}
                </button>;
              })}
            </nav>

            <div className="mt-10 mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">التنظيم</div>
            <nav className="space-y-1">
              {[{ label: "آخر الملفات", icon: Clock3 }, { label: "المؤرشف", icon: Archive }].map((item) => { const Icon = item.icon; return <button key={item.label} onClick={() => notify(`تم فتح ${item.label}`)} className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/50 transition-all hover:bg-white/[0.045] hover:text-white"><Icon className="h-[18px] w-[18px] text-white/35 group-hover:text-orange-300" /><span>{item.label}</span></button>; })}
            </nav>

            <div className="mt-auto">
              <div className="mb-5 rounded-2xl border border-orange-400/15 bg-gradient-to-br from-orange-500/[0.13] to-red-500/[0.03] p-4">
                <div className="mb-3 flex items-center justify-between"><span className="text-xs text-white/55">مساحة التخزين</span><HardDrive className="h-4 w-4 text-orange-300" /></div>
                <div className="mb-2 flex items-end justify-between"><span className="font-display text-2xl font-semibold">68.4</span><span className="mb-1 text-xs text-white/40">من 100 GB</span></div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[68%] rounded-full bg-gradient-to-l from-[#ff9e44] to-[#f23d33]" /></div>
                <button onClick={() => notify("ترقية المساحة ستكون متاحة قريبًا")} className="mt-3 text-xs font-medium text-orange-300 hover:text-orange-200">ترقية المساحة <ChevronLeft className="mr-1 inline h-3 w-3" /></button>
              </div>
              <button onClick={() => notify("الإعدادات قيد التحضير")} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/45 hover:bg-white/5 hover:text-white"><Settings2 className="h-[18px] w-[18px]" />الإعدادات</button>
              <div className="mt-3 flex items-center gap-3 border-t border-white/[0.06] px-3 pt-4"><div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-orange-300 to-red-600 text-sm font-bold text-white">خ</div><div className="min-w-0"><div className="truncate text-sm font-medium">خالد سيف</div><div className="truncate text-[11px] text-white/35">kholudsaif@gmail.com</div></div><button onClick={() => notify("تم تسجيل الخروج (تجريبي)")} className="mr-auto text-white/30 hover:text-red-300"><LogOut className="h-4 w-4" /></button></div>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#100d0d]/80 px-5 py-4 backdrop-blur-xl md:px-9">
            <div className="mx-auto flex max-w-[1400px] items-center gap-3">
              <button onClick={() => setMenuOpen(true)} className="rounded-xl border border-white/10 p-2 text-white/60 hover:bg-white/5 lg:hidden"><Menu className="h-5 w-5" /></button>
              <div className="relative max-w-[500px] flex-1"><Search className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث في ملفاتك..." className="h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.045] pr-10 pl-16 text-sm text-white outline-none placeholder:text-white/28 transition focus:border-orange-400/45 focus:bg-white/[0.065]" /><kbd className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/30 sm:block">⌘ K</kbd></div>
              <div className="mr-auto flex items-center gap-2"><button onClick={() => setDriveConnected(!driveConnected)} className={`hidden items-center gap-2 rounded-xl border px-3 py-2.5 text-xs transition sm:flex ${driveConnected ? "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300" : "border-orange-400/20 bg-orange-400/[0.07] text-orange-300"}`}><span className={`h-1.5 w-1.5 rounded-full ${driveConnected ? "bg-emerald-400" : "bg-orange-400"}`} />{driveConnected ? "Google Drive متصل" : "ربط Google Drive"}</button><button onClick={() => notify("لا توجد إشعارات جديدة")} className="rounded-xl border border-white/10 p-2.5 text-white/45 hover:bg-white/5"><Clock3 className="h-[18px] w-[18px]" /></button><div className="relative"><button onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-full border border-orange-300/20 bg-gradient-to-br from-orange-300 to-red-600 text-sm font-bold shadow-lg shadow-orange-950/20">خ</button></div></div>
            </div>
          </header>

          <div className="mx-auto max-w-[1400px] px-5 py-8 md:px-9 md:py-10">
            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="mb-2 flex items-center gap-2 text-xs text-white/35"><Cloud className="h-3.5 w-3.5 text-orange-400" />مساحة خالد سيف <ChevronLeft className="h-3 w-3" /> Google Drive</div><h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">ملفاتي <span className="text-white/25">.</span></h1><p className="mt-2 text-sm text-white/40">كل ملفاتك المهمة، مرتبة في مكان واحد.</p></div><button onClick={() => setShowUpload(true)} className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#ff7045] to-[#e83d34] px-4 py-3 text-sm font-semibold shadow-[0_10px_30px_rgba(244,63,37,.2)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(244,63,37,.3)] active:scale-[.98]"><UploadCloud className="h-4 w-4 transition group-hover:-translate-y-0.5" />رفع ملف جديد</button></div>

            <section className="mb-8 grid gap-3 sm:grid-cols-3"><div className="stat-card"><div className="flex items-center justify-between"><span>إجمالي الملفات</span><File className="h-4 w-4 text-orange-300" /></div><div className="mt-3 text-2xl font-semibold">{formatStat("128")}</div><div className="mt-1 text-xs text-emerald-300/80">+12% <span className="text-white/30">من الشهر الماضي</span></div></div><div className="stat-card"><div className="flex items-center justify-between"><span>المشاركة معي</span><Share2 className="h-4 w-4 text-orange-300" /></div><div className="mt-3 text-2xl font-semibold">{formatStat("12")}</div><div className="mt-1 text-xs text-white/30">من 6 أشخاص</div></div><div className="stat-card"><div className="flex items-center justify-between"><span>المساحة المستخدمة</span><CloudDownload className="h-4 w-4 text-orange-300" /></div><div className="mt-3 text-2xl font-semibold">{formatStat("68.4 GB")}</div><div className="mt-1 text-xs text-white/30">68% من المساحة الكلية</div></div></section>

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-4"><div className="flex items-center gap-1.5 text-sm font-medium"><FolderOpen className="h-4 w-4 text-orange-400" />الملفات الأخيرة</div><span className="text-xs text-white/25">{filteredFiles.length} عنصر</span></div><div className="flex items-center gap-2"><button onClick={() => notify("تم فتح خيارات الترتيب")} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-white/55 hover:bg-white/5">آخر تعديل <ChevronDown className="h-3.5 w-3.5" /></button><div className="flex rounded-lg border border-white/10 bg-white/[0.025] p-0.5"><button onClick={() => setView("list")} className={`rounded-md p-1.5 ${view === "list" ? "bg-white/10 text-orange-300" : "text-white/35"}`}><List className="h-4 w-4" /></button><button onClick={() => setView("grid")} className={`rounded-md p-1.5 ${view === "grid" ? "bg-white/10 text-orange-300" : "text-white/35"}`}><Grid2X2 className="h-4 w-4" /></button></div><button onClick={() => notify("إنشاء مجلد جديد")} className="rounded-lg border border-white/10 p-2 text-white/50 hover:bg-white/5 hover:text-orange-300"><Plus className="h-4 w-4" /></button></div></div>

            {selected.length > 0 && <div className="mb-3 flex items-center gap-3 rounded-xl border border-orange-400/20 bg-orange-400/[0.08] px-4 py-2.5 text-xs text-orange-100"><span>تم تحديد {selected.length} عناصر</span><div className="mr-auto flex gap-1"><button onClick={() => notify("تم تنزيل العناصر المحددة")} className="rounded-lg p-2 hover:bg-white/10"><ArrowDownToLine className="h-4 w-4" /></button><button onClick={() => notify("تم نسخ رابط المشاركة")} className="rounded-lg p-2 hover:bg-white/10"><Copy className="h-4 w-4" /></button><button onClick={() => setSelected([])} className="rounded-lg p-2 hover:bg-white/10"><X className="h-4 w-4" /></button></div></div>}

            {view === "list" ? <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.018]"><div className="grid grid-cols-[40px_minmax(220px,1.6fr)_minmax(100px,.65fr)_minmax(150px,.8fr)_minmax(100px,.5fr)_34px] items-center gap-3 border-b border-white/[0.06] px-4 py-3 text-[11px] font-medium text-white/30"><button onClick={toggleAll} className={`h-4 w-4 rounded border ${selected.length === filteredFiles.length ? "border-orange-400 bg-orange-400" : "border-white/20"}`} /> <span>الاسم</span><span>الحجم</span><span>آخر تعديل</span><span>المالك</span><span /></div>{filteredFiles.map((file) => <div key={file.id} className={`file-row grid grid-cols-[40px_minmax(220px,1.6fr)_minmax(100px,.65fr)_minmax(150px,.8fr)_minmax(100px,.5fr)_34px] items-center gap-3 px-4 py-3.5 text-sm ${selected.includes(file.id) ? "bg-orange-400/[0.07]" : ""}`}><button onClick={() => toggleSelect(file.id)} className={`h-4 w-4 rounded border ${selected.includes(file.id) ? "border-orange-400 bg-orange-400" : "border-white/20 hover:border-orange-300"}`} /> <div className="flex min-w-0 items-center gap-3"><div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${surfaceColors[file.color] ?? surfaceColors.orange}`}><FileIcon type={file.type} color={file.color} /></div><div className="min-w-0"><div className="flex items-center gap-2 truncate font-medium text-white/85">{file.name}{file.favorite && <Star className="h-3 w-3 shrink-0 fill-amber-300 text-amber-300" />}</div><div className="mt-0.5 flex items-center gap-1 text-[11px] text-white/30">{file.shared && <><Users className="h-3 w-3" />مشترك مع الفريق</>}</div></div></div><span className="text-xs text-white/45">{file.size}</span><span className="text-xs text-white/45">{file.modified}</span><span className="text-xs text-white/55">{file.owner}</span><button onClick={() => notify(`خيارات ${file.name}`)} className="rounded-lg p-1.5 text-white/30 hover:bg-white/10 hover:text-white"><MoreHorizontal className="h-4 w-4" /></button></div>)}</div> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{filteredFiles.map((file) => <button key={file.id} onClick={() => toggleSelect(file.id)} className={`group rounded-2xl border p-5 text-right transition hover:-translate-y-1 hover:border-orange-400/30 hover:bg-white/[0.04] ${selected.includes(file.id) ? "border-orange-400/40 bg-orange-400/[0.07]" : "border-white/[0.07] bg-white/[0.018]"}`}><div className="mb-8 flex items-start justify-between"><div className={`grid h-12 w-12 place-items-center rounded-2xl ${surfaceColors[file.color] ?? surfaceColors.orange}`}><FileIcon type={file.type} color={file.color} /></div><Ellipsis className="h-5 w-5 text-white/25 group-hover:text-orange-300" /></div><div className="truncate text-sm font-medium text-white/85">{file.name}</div><div className="mt-2 flex items-center justify-between text-[11px] text-white/35"><span>{file.size}</span><span>{file.modified.split("،")[0]}</span></div></button>)}</div>}

            {filteredFiles.length === 0 && <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center"><Search className="mx-auto mb-3 h-7 w-7 text-white/20" /><p className="text-sm text-white/45">لم نعثر على ملفات بهذا الاسم</p></div>}

            <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-orange-400/10 bg-gradient-to-l from-orange-500/[0.07] to-transparent px-5 py-4 text-xs text-white/40 sm:flex-row"><div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" />ملفاتك مشفرة وآمنة مع Google Drive</div><button onClick={() => notify("تم تحديث المزامنة")} className="text-orange-300 hover:text-orange-200">آخر مزامنة منذ 3 دقائق <ChevronLeft className="mr-1 inline h-3 w-3" /></button></div>
          </div>
        </main>
      </div>

      {showUpload && <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-5 backdrop-blur-sm"><div className="w-full max-w-md rounded-3xl border border-orange-300/20 bg-[#1b1110] p-6 shadow-2xl shadow-black/50"><div className="mb-5 flex items-center justify-between"><div><h2 className="font-display text-xl font-semibold">رفع ملف جديد</h2><p className="mt-1 text-xs text-white/40">أضف ملفًا إلى Google Drive الخاص بك</p></div><button onClick={() => setShowUpload(false)} className="rounded-xl p-2 text-white/40 hover:bg-white/5"><X className="h-5 w-5" /></button></div><div onClick={() => notify("اختيار الملفات سيكون متاحًا عند ربط Drive API")} className="grid cursor-pointer place-items-center rounded-2xl border border-dashed border-orange-400/25 bg-orange-400/[0.05] py-12 transition hover:bg-orange-400/[0.09]"><UploadCloud className="mb-3 h-8 w-8 text-orange-300" /><span className="text-sm font-medium">اسحب الملفات هنا أو اختر من جهازك</span><span className="mt-2 text-xs text-white/30">PDF, DOCX, XLSX, JPG حتى 2GB</span></div><div className="mt-5 flex gap-2"><button onClick={() => setShowUpload(false)} className="flex-1 rounded-xl border border-white/10 py-3 text-sm text-white/55 hover:bg-white/5">إلغاء</button><button onClick={() => { setShowUpload(false); notify("تم تجهيز نافذة الرفع"); }} className="flex-1 rounded-xl bg-gradient-to-l from-[#ff7045] to-[#e83d34] py-3 text-sm font-semibold">متابعة</button></div></div></div>}
      {notice && <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl border border-orange-300/20 bg-[#2a1713] px-4 py-3 text-sm text-orange-100 shadow-2xl shadow-black/30">{notice}</div>}
    </div>
  );
}
