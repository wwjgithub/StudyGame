module game.model {
    import Model = puremvc.Model;

    export class HeroModel {

        userId: number;
        userName: string;
        nick: string


        constructor(userId: number, userName: string, nick: string) {
            this.userId = userId;
            this.userName = userName;
            this.nick = nick;
        }
    }
}