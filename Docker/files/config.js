
var config = {
  // @@ENV gets replaced by build system
  environment: "production",
  // If the UI is served through a proxied URL, this can be set here.
  rootUrl: "",
  // Defines the Marathon API URL,
  // leave empty to use the same as the UI is served.
  apiURL: "https://api-asgard.sieve.com.br/",
  // Intervall of API request in ms
  updateInterval: 5000,
  // Local http server URI while tests run
  localTestserverURI: {
    address: "localhost",
    port: 8181
  },
  version: "1.1.1-sievetech"
};

export default config;
