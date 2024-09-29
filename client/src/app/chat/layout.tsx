

export default function chatLayout({
    children,
    message  
  }:{
      children:React.ReactNode,
      message:React.ReactNode
  }){
      return (
          <>
          <main className="h-[100vh]  ">
                <div className="h-full bg-[#12132a] grid grid-cols-10">
                    {children}
                    {message}
                </div>
            </main>
          </>
      );
  }