module game.model {
    import Model = puremvc.Model;

    export class HeroModel {

        userId: number;
        userName: number;
        nick: string


        constructor(userId: number, userName: number, nick: string) {
            this.userId = userId;
            this.userName = userName;
            this.nick = nick;
        }
    }
}