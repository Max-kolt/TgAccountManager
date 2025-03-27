type AccountTableInfo = {
  id: number
  login: string;
  phone: string;
  last_activity?: string;
  created_at?: string;
};

type AccountInfo = {
  id: number
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

type UserInfo = {
  check_tg_msg: boolean;
  create_users: boolean;
  created_at: string;
  is_active: boolean;
  is_admin: boolean;
  manage_tg_accounts: boolean;
  name: string;
  use_func: boolean;
};
