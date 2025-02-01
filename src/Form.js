import { Formik, Form, Field, ErrorMessage, useField} from "formik";
import * as Yup from 'yup';

const MyTextInput = ({label, ...props})=> {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field}/>
            
            {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null}
        </>
    )
};

const MyCheckbox = ({children, ...props})=> {
    const [field, meta] = useField({...props, type: 'checkbox'});
    return (
        <>
            <label className="checkbox">
                <input type="checkbox" {...props} {...field}/>
                {children}
            </label>
            
            {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null}
        </>
    )
};

const CustomForm = () => {

    return (
        <Formik
            initialValues = {{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}
            validationSchema =  {Yup.object({
                name: Yup.string()
                    .min(2, "Мінімум 2 символи!")
                    .required("Обов'язкове поле!"),
                email: Yup.string()
                    .email("Неправельний email!")
                    .required("Обов'язкове поле!"),
                amount: Yup.number()
                    .min(5, "Не менше 5!")
                    .required("Обов'язкове поле!"),
                currency: Yup.string()
                    .required("Оберіть валюту!"),
                text: Yup.string()
                    .min(10, "Не менше 10 символів!"),
                terms: Yup.boolean()
                    .required("Необхідно погодитись!")
                    .oneOf([true], "Необхідно погодитись!")
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
        
        >
            <Form className="form">
                <h2>Благодійність</h2>
                <MyTextInput
                    label="Ваше ім'я"
                    id="name"
                    name="name"
                    type="text"
                />
                <MyTextInput
                    label="Ваша пошта"
                    id="email"
                    name="email"
                    type="email"
                />
                <label htmlFor="amount">Сумма</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className="error" name="amount" component='span'/>
                <label htmlFor="currency">Валюта</label>
                <select
                    id="currency"
                    name="currency"
                    as="select"
                >
                <ErrorMessage className="error" name="currency" component='span'/>
                        <option value="">Оберіть валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="EUR">EUR</option>
                </select>
                <label htmlFor="text">Ваше повідомлення</label>
                <Field
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className="error" name="text" component='span'/>
                <MyCheckbox
                    name="terms">
                        Чи погоджуєтесь з політикою конфиденційності?
                    </MyCheckbox>
                <button type="submit">Надіслати</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;