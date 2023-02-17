import { FiSend } from "react-icons/fi";
import { TbRobot } from "react-icons/tb";
import { BiUser } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import { useMutation } from "react-query";
import { fetchResponse } from "./api";

function App() {
  const [chat, setChat] = useState([]);
  const [value, setValue] = useState("");
  const [load, setLoad] = useState(false);

  const mutation = useMutation({
    mutationFn: () => {
      setLoad(true);
      return fetchResponse(chat);
    },
    onSuccess: (data) => {
      setLoad(false),
        setChat((prev) => [...prev, { sender: "ai", message: data.message }]);
    },
  });

  //sendMessage
  const sendMessage = async (message) => {
    await Promise.resolve(setChat((prev) => [...prev, message]));
    mutation.mutate();
  };
  //Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trimStart() === "") return;
    sendMessage({ sender: "user", message: value });
    setValue("");
  };

  return (
    <div className="bg-[#343541] min-h-screen w-full  flex flex-col items-center p-5">
      <div className="text-white w-fit text-4xl font-semibold">
        ChatGPT Clone
      </div>
      <div className="h-[75vh] overflow-y-auto w-full md:w-10/12 lg:w-8/12 mt-auto pr-2  flex flex-col gap-0 chat-wrapper">
        {chat?.map((message, i) => (
          <div
            key={i}
            className={
              message.sender === "ai"
                ? "text-[#e0ecf1] bg-[#40414F]  py-7 px-2 flex gap-2"
                : "text-[#e0ecf1] bg-[#343541] py-7 px-2 flex gap-2"
            }
          >
            <div
              className={
                message.sender === "ai"
                  ? "text-4xl h-fit p-1 bg-[#10A37F] rounded-sm text-white"
                  : "text-4xl h-fit p-1 bg-[#8256C4] rounded-sm text-white "
              }
            >
              {message.sender === "ai" ? <TbRobot /> : <BiUser />}
            </div>
            <div className={message.sender === "ai" ? "text-[#d1d5c1]" : ""}>
              {message.message}
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mt-auto flex gap-2 items-center h-[60px] bg-[#40414F] w-full md:w-10/12 lg:w-8/12 p-5 rounded-lg"
      >
        <input
          className="outline-none w-full bg-transparent text-white"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="hover:bg-black rounded-md p-1">
          {load === true ? (
            <AiOutlineLoading3Quarters className="text-white text-xl animate-spin" />
          ) : (
            <FiSend className="text-white text-xl " />
          )}
        </button>
      </form>
    </div>
  );
}

export default App;
