module game {

    import Mediator = puremvc.Mediator;

    export class LoginMediator extends Mediator {

        public static NAME: string = "LoginMediator";

        constructor(mediatorName: string, viewComponent: any) {
            super(mediatorName, viewComponent);
        }

        public show() {
            console.log("LoginMediator show");
        }
    }
}