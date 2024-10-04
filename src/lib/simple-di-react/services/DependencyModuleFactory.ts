// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ServicesRecord = Record<string, any>;

export class DependencyModuleFactory<TModule extends ServicesRecord> {
  private services: Map<keyof TModule, TModule[keyof TModule]> = new Map();
  private servicesEntriesCache = {} as TModule;

  constructor(services?: {
    [TKey in keyof TModule]: TModule[TKey];
  }) {
    if (services) {
      this.services = new Map(Object.entries(services));
    }
  }

  register<TKey extends keyof TModule>(
    key: TKey,
    Service: TModule[TKey],
  ): void {
    this.services.set(key, Service);
  }

  unregister<TKey extends keyof TModule>(key: TKey): boolean {
    return this.services.delete(key);
  }

  get<TKey extends keyof TModule>(key: TKey): TModule[TKey] {
    const Service = this.services.get(key);

    if (!Service) {
      throw new Error(`Service ${String(key)} not registered`);
    }

    return Service;
  }

  getServices(): TModule {
    if (
      Object.entries(this.servicesEntriesCache).length !== this.services.size
    ) {
      this.servicesEntriesCache = Object.fromEntries(this.services) as TModule;
    }

    return this.servicesEntriesCache;
  }
}
