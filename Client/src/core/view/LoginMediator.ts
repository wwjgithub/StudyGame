module game {

    import Mediator = puremvc.Mediator;

    export class LoginMediator extends Mediator {

        public static NAME: string = "LoginMediator";

        constructor(mediatorName: string, viewComponent: any) {
            super(mediatorName, viewComponent);
        }

        listNotificationInterests(): string[] {
            return super.listNotificationInterests();
        }

        handleNotification(notification: puremvc.INotification): void {
            super.handleNotification(notification);
        }

        public show() {
            console.log("LoginMediator show");
        }
    }
}