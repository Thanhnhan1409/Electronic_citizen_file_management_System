export function validateName(name){
    const regex =/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/;
    
    return (regex.test(name)&& (name.length>=1 && name.length<=255));
}
export function validateNumber(id){
    for(let i=0; i< id.length; i++){
        if( id.charAtCode(i) <=48 || id.charAtCode(i)>=57)
            return false;
    }
    return true;
}
export function validateEmail(email){
    const regex =/^\S+@\S+\.\S+$/;
    return regex.test(email);
}
export function validateAddress(add){
    return ((add.length>=1&& add.length <=1000))
}