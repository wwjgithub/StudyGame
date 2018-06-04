module game{
    import Facade = puremvc.Facade;
    import IFacade = puremvc.IFacade;
    import HeroModel = game.model.HeroModel;

    export class AppFacade extends Facade implements IFacade {
        private static STARTUP: string = "STARTUP";


        public static getInstance(): AppFacade {
            if (this.instance == null) {
                this.instance = new AppFacade();
            }
            return <AppFacade>this.instance;
        }


        initializeView(): void {
            super.initializeView();
            this.registerMediator(new LoginMediator(LoginMediator.NAME,null))
        }

        initializeController(): void {
            super.initializeController();
            this.registerProxy(new HeroProxy(HeroProxy.NAME,new HeroModel(1,"wwj","wuwenjun")))
        }

        initializeFacade(): void {
            super.initializeFacade();
            this.registerCommand(AppFacade.STARTUP, StartCommand)
        }

        public startup() {
            this.sendNotification(AppFacade.STARTUP)
        }
    }
}