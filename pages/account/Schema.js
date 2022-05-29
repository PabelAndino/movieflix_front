import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
    username: Yup.string()
        .min(5, "El usuario debe de contener al menos 5 caracteres ")
        .max(10, "Demasiados caracteres, debe tener hasta 10 caracteres ")
        .required("Porfavor intrduzca el usuario"),
    password: Yup.string()
        .min(5, "Su contraseña debe de tener al menos 5 caracteres")
        .max(10, "La contraseña no debe ser mayor a 10 caracteres")
        .required("Porfavor introduzca la contraseña"),

});
export const siginSchema = Yup.object().shape({
    password: Yup.string()
        .min(5, "Your password must be at least 5 characters long")
        .max(50, "Your password must be at least 5 characters long")
        .required("Please provide a password"),
    email: Yup.string()
        .email("Please enter a valid email address ")
        .required("Please provide a Email address"),
});

export const forgetPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email address ")
        .required("Please provide a Email address"),
});
