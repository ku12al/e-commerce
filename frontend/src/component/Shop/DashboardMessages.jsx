import React from "react";

const DashboardMessages = () => {
  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      <h1 className="text-center text-[30px] py-3 font-Poppins">
        All Messages
      </h1>

      <Messages />
      <Messages />
      <Messages />
      <Messages />
      <Messages />


    </div>
  );
};

const Messages = () => {
  return (
    <div className="w-full flex p-3 px-3 my-3 bg-[#00000010] cursor-pointer">
      <div className="relative">
        <img
          src="https://th.bing.com/th/id/OIP.FphEn6Kk-wNmWht9k32AlAHaFC?rs=1&pid=ImgDetMain"
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">Kunal Kumar</h1>
        <p className="text-[16px] text-[#000c]">Yeh i am happy</p>
      </div>
    </div>
  );
};

export default DashboardMessages;
