export interface Config {
  /**
   * Configuración del laboratorio ACME.
   * @visibility backend
   */
  acme?: {
    healthApi?: {
      /**
       * URL del mock o de la API real de salud.
       * @visibility backend
       */
      baseUrl?: string;
    };
  };
}
