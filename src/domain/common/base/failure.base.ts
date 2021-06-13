export class Failure {
    readonly code: number;
    readonly message: String;

    constructor(code : number = -1, message: String){
        this.code = code;
        this.message = message;  
    }
}