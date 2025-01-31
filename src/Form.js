import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';



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
                <label htmlFor="name">Ваше ім'я</label>
                <Field
                    id="name"
                    name="name"
                    type="text"
                />
                <ErrorMessage className="error" name="name" component='span'/>
                <label htmlFor="email">Ваша пошта</label>
                <Field
                    id="email"
                    name="email"
                    type="email"
                />
                <ErrorMessage className="error" name="email" component='span'/>
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
                <label className="checkbox">
                    <Field 
                        name="terms" 
                        type="checkbox"
                    />
                    <ErrorMessage className="error" name="terms" component='span'/>
                        Чи погоджуєтесь з політикою конфиденційності?
                </label>
                <button type="submit">Надіслати</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;