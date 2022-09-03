import getContract, {signerProvider} from "./utils/getContract.js";

async function getTodoList() {
  const contract = getContract();
  try {
    const response = await contract.getTodos();
    const formatted = response.map((item) => {
      return {
        name: item[0],
        description: item[1],
        status: item[2],
      };
    });
    return formatted;
  } catch (error) {
    console.log("error", error);
  }
}


const upadateTodoUI = async () => {
  const data = await getTodoList();
  console.log(data, "data");
  data.forEach((item) => {
    todos.innerHTML += `   
    <li class='my-2'>${item.description}</li>`;
  });
};

upadateTodoUI();

const connectWallet = async () => {
  await signerProvider.send("eth_requestAccounts");
};

addBtn.addEventListener('click', async function addToDo(){
  await connectWallet();
  const todoTitle = document.getElementById('todoTitle').value;
  const todoDesc = document.getElementById('todoDesc').value;
  if (todoTitle != '' || todoDesc != '' ) {
    const contract = getContract(true);

    try {
      const response = await contract.createTodo(todoTitle, todoDesc);
      await response.wait();
      
      console.log(response)
    } catch (error) {
      console.log("error", error);
    }
  }else{
    alert('Fill todo details appropriately');
  }
});

// add new list
