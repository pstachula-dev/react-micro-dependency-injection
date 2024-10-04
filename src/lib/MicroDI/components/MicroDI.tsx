import { createContext, ReactNode, useContext } from "react";

export const dependencyServiceFactory = <T,>(serviceName: string) => {
  const ServiceContext = createContext<T>(null!);

  const useServiceContext = (): NonNullable<T> => {
    const services = useContext(ServiceContext);

    if (!services) {
      throw new Error(
        `use${serviceName}Service must be used within a ${serviceName}`,
      );
    }

    return services;
  };

  const ServiceProvider = ({
    children,
    deps,
  }: {
    deps: T;
    children: ReactNode;
  }) => {
    return (
      <ServiceContext.Provider value={deps}>{children}</ServiceContext.Provider>
    );
  };

  return [ServiceProvider, useServiceContext] as const;
};
