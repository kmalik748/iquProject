// tslint:disable-next-line:class-name
export type apiOutputModel   = {
  Error: boolean;
  Data:
    {
      id: number, name: string, email: string
    }
};

export type paymentApiModal   = {
  Error: boolean;
  Data:
    {
      msg: string
    }
};

export type UserDetails   = {
  id: number,
  name: string,
  email: string,
  accountStatus: boolean,
  isAdmin: boolean
};


export type allUsersList   = {
  id: number,
  name: string,
  email: string,
  accountStatus: boolean
};
export type signalsType   = {
  id: number,
  name: string,
  type: string,
  size: number,
  openPrice: number,
  closePrice: number,
  status: boolean,
  time: string
};

export type allUsersApiModel   = {
  Error: boolean;
  Data:
    {
      id: number, name: string, email: string, accountStatus: boolean
    }
};

export type SignalsApiFull   = {
  Error: boolean;
  Data:
    {
      id: number,
      name: string,
      type: string,
      size: number,
      openPrice: number,
      closePrice: number,
      status: boolean,
      time: string
    }
};
