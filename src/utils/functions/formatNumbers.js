export const formatNumbers = (num)=>{
    let conv = +num;
    if (typeof conv !== 'number') return 0.0;
    return conv.toFixed(2);

}