import { TaskService } from '../Services/TaskService.js';
//khai báo đối tượng service
import{Task} from '../Model/task.js'

const taskSV = new TaskService();
const getAllTask = async () => {
    // dùng service để gọi api từ backend lấy dữ liệu về
    try {
        //Bước 2:
        //dùng service để gọi api từ backend lấy dữ liệu về

        const result = await taskSV.getAllTask();
        console.log('result', result.data);

        /**
         * Bước 3: dữ liệu lấy về tách ra 2 mảng
         */
        let taskToDo = result.data.filter(task => task.status === false);
        // console.log('todo', taskToDo);
        let taskCompleted = result.data.filter(task => task.status === true);
        // console.log('todo', taskCompleted);
 
        // let contentToDo = '';
        // for (let task of taskToDo) {
        //     contentToDo += `
        //     <li>${task.taskName}<a class="buttons" style="cursor: pointer"
        //     ><i class="fa fa-trash"></i
        //   ></a>
        //   <a class="buttons" style="cursor: pointer"
        //     ><i class="fa fa-check"></i
        //   ></a>
        //     </li>
        //     `
        // }
        // document.getElementById('todo').innerHTML = contentToDo;
        renderTaskTodo(taskToDo);

        // let contentCP = '';
        // for (let taskCP of taskCompleted) {
        //     contentCP += `<li>${taskCP.taskName} <a class="buttons" style="cursor: pointer"
        //     ><i class="fa fa-trash"></i
        //   ></a>
        //   <a class="buttons" style="cursor: pointer"
        //     ><i class="fa fa-redo"></i
        //   ></a></a>
        //     </li>
            
        //     `
        // }
        // document.getElementById('completed').innerHTML = contentCP;
        renderTaskDone(taskCompleted);
    } catch (err) {
        //lỗi trong hàm try sẽ trả về biến err của catch
   }
}
const renderTaskTodo = (taskToDo) => {
    const contenTaskTodo = taskToDo.reduce((content, item, index) => {
       return content += `<li>
        <span style="cursor:pointer">${item.taskName}</span>
        <span style="cursor:pointer" onclick="delTask('${item.taskName}')"><i class=" fa fa-trash"></i></span>
        <span style="cursor:pointer" onclick="doneTask('${item.taskName}')"><i class=" fa fa-check"></i></span>

        </li>`
         
    },'')
    document.getElementById('todo').innerHTML = contenTaskTodo;
}
const renderTaskDone = (taskDone) => {
    const contenTaskDone = taskDone.reduce((content, item, index) => {
        content += `<li>
        <span style="cursor:pointer">${item.taskName}</span>
        <span style="cursor:pointer" onclick="delTask('${item.taskName}')"><i class=" fa fa-trash"></i></span>
        <span style="cursor:pointer" onclick="rejectTask('${item.taskName}')"><i class=" fa fa-undo"></i></span>

        </li>`
        return content;
    },'')
    document.getElementById('completed').innerHTML = contenTaskDone;
}

/**
 * Bước 1: định nghĩa và gọi hàm getAllTask
 */
getAllTask();

//==============Thêm Task========
/**
 * Bước 1: Định nghĩa sự kiện click cho button addItem
 * 
 */
document.getElementById('addItem').onclick = async (event) => {
    // event.preventDefault(); chặn sự kiện của thẻ submit
    // event.target <= đại diện cho thẻ button đang được onclick

    //lấy thông tin người dùng nhập từ giao diện
    let taskName = document.getElementById('newTask').value;

    //tạo ra object BE yêu cầu
    const taskModel = new Task();
    taskModel.taskName = taskName;

    //gọi API đưa dữa liệu về server
    try {
        let result = await taskSV.addTask(taskModel);
        console.log('kết quả them task', result.data);
        //sau khi thêm thành công gọi api getAllTask
       

    } catch (err) {
        console.log(err);
    }
    getAllTask();
};
///=====Xóa dữ Liệu=======
window.delTask = async (taskName) => {
    let cfm = confirm('Bạn có muốn xóa task?')
    if (cfm) {
         //gọi api mỗi lần người dùng bấm nút xóa dữ liệu
    try {
        let result = await taskSV.deleteTask(taskName);
        console.log(result.data);
        //loading lại trang sau khi xóa. Gọi lại hàm het task
        getAllTask();
    }catch(err){}
    }
   

}
//====Done task------
window.doneTask = async (taskName) => {
    let cfm = confirm('Bạn có muốn done task?')
    if (cfm) {
        
    try {
        let result = await taskSV.doneTask(taskName);
        console.log(result.data);
        
        getAllTask();
    }catch(err){}
    }
   

}
window.rejectTask = async (taskName) => {
    let cfm = confirm('Bạn có muốn quay lại?')
    if (cfm) {
        
    try {
        let result = await taskSV.rejectTask(taskName);
        console.log(result.data);
        
        getAllTask();
    }catch(err){}
    }
   

}
