import * as yup from 'yup'


const formSchema = yup.object().shape({
    name: yup.string()
        .trim()
        .min(2, 'Name must be at least two characters long')
        .required('Name is a required field'),
    size: yup.string().required('Size is a required field'),
    toppings: yup.string().required('Please select a topping'),
    special: yup.string()
})

export default formSchema