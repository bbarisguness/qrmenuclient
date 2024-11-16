export default function Button({ setIsMenuActive }) {
  return (
    <div
      onClick={() => setIsMenuActive(true)}
      className="absolute bottom-10 w-full"
    >
      <div className="rounded-[30px] bg-white h-[70px] mr-[50px] ml-[50px] justify-center items-center flex font-Poppins font-bold text-[#1E5CCE] text-[20px] cursor-pointer">
        Bilgi
      </div>
    </div>
  );
}
