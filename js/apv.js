axios
  .get("https://jsonplaceholder.typicode.com/todos")
  .then((res) => {
    console.log("aqui bien");
    console.log(res);
  })
  .catch((err) => {
    console.log("error");
    console.log(err);
  });

axios
  .get("https://jsonplaceholder.typicode.com/todos/2")
  .then((res) => {
    console.log("aqui bien");
    console.log(res);
  })
  .catch((err) => {
    console.log("error");
    console.log(err);
  });
