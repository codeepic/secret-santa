export interface IUsers {
    users: IUser[]
}

export interface IUser{
    guid: string,
    name: {
        first: string,
        last: string
    },
    email: string,
    phone: string
}

export interface IParticipant extends IUser{
    assignedGuid: string;
    hidden: boolean
}
