export default function Button({ setIsMenuActive, theme }) {
  return (
    <div
      onClick={() => setIsMenuActive(true)}
      className="absolute bottom-10 w-full"
    >
      <div className={`rounded-[30px] bg-[#${theme?.buttonBackgroundColor}] h-[70px] mr-[50px] ml-[50px] justify-center items-center flex font-Poppins font-bold text-[#${theme?.buttonTextColor}] text-[20px] cursor-pointer`}>
        Bilgi
      </div>
    </div>
  );
}
