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





async function updateTodoDetails(id) {
  await connectWallet();
  var newTitle = document.getElementById('newTitle').value;
  var newDesc = document.getElementById('newDesc').value;
  if (newTitle != '' || newDesc != '' ) {
    const contract = getContract(true);

    try {
      const response = await contract.updateTodo(id, newTitle, newDesc);
      await response.wait();
      console.log(response);
      console.log('update successful');
    } catch (error) {
      console.log("error", error);
    }
  }else{
    alert('Fill todo details appropriately');
  }
}

$(document).on('click', '.updateBtn', function(){
  var rid=$(this).val();
  $('#updateTodoModal').modal('show');
  $('.modal-footer #confirmTodoUpdate').val(rid);
});

$(document).on('click', '#confirmTodoUpdate', async function(){
  var id=$(this).val();
  $('#updateTodoModal').modal('hide');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();

  await connectWallet();
  var newTitle = document.getElementById('newTitle').value;
  var newDesc = document.getElementById('newDesc').value;
  if (newTitle != '' || newDesc != '' ) {
    const contract = getContract(true);

    try {
      const response = await contract.updateTodo(id, newTitle, newDesc);
      await response.wait();
      console.log(response);
      alert('update successful');
    } catch (error) {
      console.log("error", error);
    }
  }else{
    alert('Fill todo details appropriately');
  }
    
});


const upadateTodoUI = async () => {
  const data = await getTodoList();
  console.log(data, "data");
  data.map((item, index) => {
    todos.innerHTML += `
    <li class='my-2'>${item.description} 
    <button type="button" style="float:right; cursor:pointer; padding:0 5px" class="updateBtn btn btn-primary" data-toggle="modal" value="${index}" data-target="#updateTodoModal">
      edit
    </button>
    </li>`;
  });
};

upadateTodoUI();

const connectWallet = async () => {
  await signerProvider.send("eth_requestAccounts");
};


// add new list

addBtn.addEventListener('click', async () => {
  await connectWallet();
  var todoTitle = document.getElementById('todoTitle').value;
  var todoDesc = document.getElementById('todoDesc').value;
  console.log(todoTitle, todoDesc);
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
