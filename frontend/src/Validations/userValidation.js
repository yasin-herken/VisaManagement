import * as yup from 'yup';

const userSchema = yup.object().shape({
    username: yup.string().required("Username is required").min(5,"Username must be greater than 5").max(20,"Username must be less than 20"),
    password: yup.string().required("Password is required").min(6,"Password must be greater than 6").max(20,"Password must be less than 20")
}).required();
export default userSchema;