module game {

    import SimpleCommand = puremvc.SimpleCommand;

    export class StartCommand extends SimpleCommand {

        execute(notification: puremvc.INotification): void {
            super.execute(notification);
            let login:LoginMediator=this.facade.retrieveMediator(LoginMediator.NAME) as LoginMediator;
            login.show();
        }

    }
}