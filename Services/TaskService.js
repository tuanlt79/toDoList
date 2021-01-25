
import {BaseService} from'./BaseService.js'
export class TaskService extends BaseService{
    constructor() {
        super();// gọi lại phương thức contructor của class cha
     };
    
    //Định nghĩa phương thức getAllTask
    getAllTask = () => {
        return this.get('http://svcy.myclass.vn/api/ToDoList/GetAllTask');
       
        
    }
    //định nghĩa hàm đưa dữ liệu về backend
    addTask = (task) => {
        return this.post('http://svcy.myclass.vn/api/ToDoList/AddTask',task);
        
    } //<= đúng format theo backed qui định
    
    //định nghĩa hàm xóa dữ liệu
    deleteTask = (taskName) => {
        return this.delete(`http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`) 
        
    }
    //định nghĩa hàm done task
    doneTask = (taskName) => {
        return this.put(`http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`) 
        
    }
    // reject task
    rejectTask = (taskName) => {
        return this.put(`http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`) 
        
    }
};
