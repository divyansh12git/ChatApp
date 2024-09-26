import { LeftPane,ProfileCard, Appbar } from "@/components/custom";


export default function Home() {
  return (
    <main className="h-[100vh]  ">
      <div className="h-full bg-[#12132a] grid grid-cols-10">
        
        <LeftPane />
        <div className="bg-slate-500 col-span-7 h-full"></div>

      </div>
    </main>
  );
}
