interface Model {
    readonly title:string;
    readonly isCompleted:boolean;
    readonly createdAt:number;
}

function factory(title:string):Model {
    return {
        title,
        isCompleted:false,
        createdAt:Date.now(),
    }
}

function complete(todo:Model):Model {
    return {
        ...todo,
        isCompleted:true,
    }
}

function uncomplete(todo:Model):Model {
    return {
        ...todo,
        isCompleted:false,
    }
}
