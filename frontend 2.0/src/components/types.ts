type AccountTableInfo = {
  login: string;
  phone: string;
  last_activity?: string;
  created_at?: string;
};

type AccountInfo = {
  login: string;
  phone: string;
  fname?: string;
  lname?: string;
  discription?: string;
  avatar?: string;
};

type LayoutProp = {
  children: React.ReactNode;
};
