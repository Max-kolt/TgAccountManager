type AccountTableInfo = {
  login: string;
  phone: string;
  last_activity?: string;
  created_at?: string;
};

type AccountInfo = {
  login: string;
  phone: string;
};

type LayoutProp = {
  children: React.ReactNode;
};

type ChatInfo = {
  chat_id: string;
  chat_name: string;
  is_readed: boolean;
  last_messages: {
    user: string;
    text: string;
  }[];
  message_time: string;
};

type AccountOnlineInfo = {
  is_online: boolean;
  last_online: string;
  online_periods: number;
  online_delay: number;
  time_utc: number;
};
