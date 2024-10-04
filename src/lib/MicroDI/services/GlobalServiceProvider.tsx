import { DependencyModuleFactory } from "../../simple-di-react/services/DependencyModuleFactory";
import { dependencyServiceFactory } from "../components/MicroDI";

interface LoggerAdapter {
  log: (mesage: string) => void;
}

class LoggerPino implements LoggerAdapter {
  log(mesage: string) {
    console.log(mesage);
  }
}

export interface GlobalServices {
  logger: LoggerPino;
}

const globalServices = new DependencyModuleFactory<GlobalServices>({
  logger: new LoggerPino(),
}).getServices();

const [DIGlobalProvider, useDIGlobalServices] =
  dependencyServiceFactory<GlobalServices>("GlobalServices");

export { DIGlobalProvider, useDIGlobalServices, globalServices };
