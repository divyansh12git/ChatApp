import bg from "../../../public/images/bg.png"
const bgimageStyling = {
    backgroundImage: `url(${bg.src})`, // .src gives the URL path of the image
    backgroundSize: 'cover', // adjust as needed
    backgroundPosition: 'center',
}
export default function AuthLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <main className={` h-[100vh] text-white`} >

            <div style={bgimageStyling}
                className={` h-full flex flex-col justify-center items-center bg-[#12132a] `} >
                <div className="text-5xl">Messagify</div>
                {/*inner box form */}
                <div className="  w-[25rem] rounded-lg my-10 p-10 bg-[#222331] outline outline-1 outline-blue-300 ">
                    {children}
                </div>
            </div>

        </main>
        
      </section>
    );
  }