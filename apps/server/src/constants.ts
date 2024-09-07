export const PORT = 3000;
/**
 * currently holding the providers in a constants array
 * this can be moved to a database or a config file
 * */
export const providersJSON = [
  {
    name: "Ski.com",
    endpoint:
      "https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator",
  },
  // {
  //   name: "Skiworld",
  //   endpoint:
  //     "https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator",
  // },
  // {
  //   name: "SkiFrance",
  //   endpoint:
  //     "https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator",
  // },
];

export const MAX_GROUP_SIZE = 10;
