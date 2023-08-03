import { FormComponent } from "constants/formConfig"


export const getInitialValues = (formConfig: FormComponent[], initialValues: {[key:string]: string} | null) =>{
    const values = formConfig.reduce((acc:{[key:string]: string},{key}) => {
        if(!initialValues) acc[key] = ""
        else acc[key] = initialValues?.[key]
        return acc
    },{})
    return values;
}