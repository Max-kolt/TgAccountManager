import { useEffect, useState } from "react";
import { get_tg_account_chats } from "../../../api/telegram_accounts";
import { DefaultButton } from "../../button/DefaultButton";
import { SendMessagePopup } from "../../popup/send_message_popup";

type ChatsViewProps = {
  login: string;
};

export function ChatsView({ login }: ChatsViewProps) {
  const [chats, setChats] = useState<ChatInfo[]>([]);
  const [clickedChat, setClickChat] = useState<ChatInfo | null>(null);
  const [sendingPopup, setSendingPopup] = useState(false);

  useEffect(() => {
    // get_tg_account_chats(login);
    setChats(
      [
        {
          chat_id: "5545531",
          chat_name: "Любовь любимая",
          is_readed: false,
          last_messages: [
            {
              user: "Любовь",
              text: "Как дела? klasdlklq3emkne j23ikjro23jr oiwd f",
            },
          ],
          message_time: "02:02",
        },
        {
          chat_id: "55423532",
          chat_name: "Любовь любимая",
          is_readed: true,
          last_messages: [
            {
              user: "Любовь",
              text: "Как дела? klasdlklq3emkne j23ikjro23jr oiwd f",
            },
          ],
          message_time: "02:02",
        },
        {
          chat_id: "5545523",
          chat_name: "Любовь любимая",
          is_readed: false,
          last_messages: [
            {
              user: "Любовь",
              text: "Как дела? klasdlklq3emkne j23ikjro23jr oiwd f",
            },
          ],
          message_time: "02:02",
        },
        {
          chat_id: "5545534",
          chat_name: "Любовь любимая",
          is_readed: true,
          last_messages: [
            {
              user: "Любовь",
              text: "Как дела? klasdlklq3emkne j23ikjro23jr oiwd f",
            },
          ],
          message_time: "02:02",
        },
        {
          chat_id: "5545535",
          chat_name: "Любовь любимая",
          is_readed: true,
          last_messages: [
            {
              user: "Любовь",
              text: "Как дела? klasdlklq3emkne j23ikjro23jr oiwd f",
            },
          ],
          message_time: "02:02",
        },
        {
          chat_id: "5545536",
          chat_name: "Любовь любимая",
          is_readed: true,
          last_messages: [
            {
              user: "Любовь",
              text: "Как дела? klasdlklq3emkne j23ikjro23jr oiwd f",
            },
          ],
          message_time: "02:02",
        },
        {
          chat_id: "5545537",
          chat_name: "Любовь любимая",
          is_readed: true,
          last_messages: [
            {
              user: "Любовь",
              text: "Как дела? klasdlklq3emkne j23ikjro23jr oiwd f",
            },
          ],
          message_time: "02:02",
        },
        {
          chat_id: "5545538",
          chat_name: "Любовь любимая",
          is_readed: true,
          last_messages: [
            {
              user: "Любовь",
              text: "Как дела? klasdlklq3emkne j23ikjro23jr oiwd f",
            },
          ],
          message_time: "02:02",
        },
        {
          chat_id: "5545539",
          chat_name: "Любовь любимая",
          is_readed: true,
          last_messages: [
            {
              user: "Любовь",
              text: "Как дела? klasdlklq3emkne j23ikjro23jr oiwd f",
            },
          ],
          message_time: "02:02",
        },
      ].sort((a, b) => (b.is_readed ? -1 : 1))
    );
  }, []);

  const returnChat = () => {
    const new_chats = chats.map((chat) => {
      if (chat.chat_id == clickedChat?.chat_id) chat.is_readed = true;
      return chat;
    });
    setChats(new_chats.sort((a, b) => (b.is_readed ? -1 : 1)));
    setClickChat(null);
  };

  return (
    <>
      <div className="w-full mb-10 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <h3>Чаты</h3>
          <DefaultButton
            text="Отправить сообщение"
            custom="text-xs p-1"
            callbackHandler={() => setSendingPopup(true)}
          />
        </div>

        <div className="border rounded-lg w-full h-1/2">
          {clickedChat ? (
            <div className="w-full h-full">
              <header className="w-full border-b p-2 flex gap-4 items-center">
                <DefaultButton
                  text="Вернуться"
                  custom="text-xs p-1"
                  callbackHandler={returnChat}
                />
                {clickedChat.chat_name}{" "}
                <span className="text-xs text-gray-500">
                  {clickedChat.chat_id}
                </span>
              </header>
              {clickedChat.last_messages.map((msg) => {
                return (
                  <p className="p-3">
                    <span className="text-gray-400">{msg.user}:</span>{" "}
                    {msg.text}
                  </p>
                );
              })}
            </div>
          ) : (
            <>
              {chats.length > 0 ? (
                chats.map((chat) => {
                  return (
                    <div
                      key={chat.chat_id}
                      onClick={() => {
                        setClickChat(chat);
                      }}
                      className="w-full px-3 py-2 border-b flex cursor-pointer justify-between items-center overflow-y-scroll rounded-lg gap-4 bg-white hover:bg-slate-400"
                    >
                      {!chat.is_readed && (
                        <span className="rounded-full w-3 h-3 bg-red-500"></span>
                      )}
                      <div className="w-full flex flex-col items-start justify-between gap-1">
                        <h4 className="w-8/12 text-lg whitespace-nowrap overflow-hidden text-ellipsis">
                          {chat.chat_name}{" "}
                          <span className="text-xs text-gray-500">
                            {chat.chat_id}
                          </span>
                        </h4>
                        <p className="text-gray-700 text-sm whitespace-nowrap w-10/12 overflow-hidden text-ellipsis">
                          {chat.last_messages[0].text}
                        </p>
                      </div>
                      <p className="text-gray-600">{chat.message_time}</p>
                    </div>
                  );
                })
              ) : (
                <div className="w-full, h-full ">Чатов нет</div>
              )}
            </>
          )}
        </div>
      </div>
      {sendingPopup && (
        <div className="fixed flex justify-center items-center bg-gray-600 bg-opacity-40 top-0 left-0 w-full h-full">
          <SendMessagePopup
            clickHandler={() => setSendingPopup(false)}
            login={login}
            hints={chats.map((chat) => {
              return { chat_id: chat.chat_id, chat_name: chat.chat_name };
            })}
          />
        </div>
      )}
    </>
  );
}
