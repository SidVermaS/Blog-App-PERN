interface UserI {
    id: string
    public_user_id?: string
    name: string
    phone: number
    email: string
    password: string
    photo_url?: string
    validPassword?: Function
}

export default UserI