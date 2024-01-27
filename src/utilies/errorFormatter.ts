/* eslint-disable @typescript-eslint/no-explicit-any */
export const errorFormatToString = (errorSources:any) =>{
    let message = "";
    if (Array.isArray(errorSources) ) {
        message = errorSources.map(el=> el.message).join('. ')
    }else if (errorSources.message) {
        message = errorSources.message;
    }else{
        message = "something went wrong"
    }

    return message;
}
export const errorFormatToObj = (error:any) =>{
    const message:Record<string,string> = {};
   
    if (Array.isArray(error?.data?.errorSources) ) {
        error.data.errorSources.forEach((err:Record<string,string>)=>{
            message[err.path] = err.message;
        })
    }

    return message;
}