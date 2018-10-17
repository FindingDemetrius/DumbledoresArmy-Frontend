export class User {
    
    private userId: number
    private userName: string
    private password: string
    private email: string
    private dob: Date
    private points: number
    private friendsList: User[]

    getUserId(): number {
        return this.userId
    }

    setUserId(userId: number) {
        this.userId = userId
    }

    getUserName(): string {
        return this.userName
    }

    setUserName(userName: string) {
        this.userName = userName
    }

    getPassword(): string {
        return this.password
    }

    setPassword(password: string) {
        this.password = password
    }

    getEmail(): string {
        return this.email
    }

    setEmail(email: string) {
        this.email = email
    }

    getDob(): Date {
        return this.dob
    }

    setDob(dob: Date) {
        this.dob = dob
    }

    getPoints(): number {
        return this.points
    }

    setPoints(points: number) {
        this.points = points
    }

    getFriendsList(): User[] {
        return this.friendsList
    }

    addFriend(user: User) {
        this.friendsList.push(user);
    }

    removeFriend(user: User): boolean {
        let index = this.friendsList.indexOf(user)

        if (index >= 0) {
            delete this.friendsList[index]
            return true
        }
        return false
    }
}