import React from 'react'
import { useForm } from 'react-hook-form';
import CustomButton from '../custom-button/CustomButton';
import styles from './From.module.scss'

const FormHandler = ({fields, onSubmit,buttonName}:any) => {
   const { register, handleSubmit, formState: { errors } } = useForm();
  return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
      {fields?.map((field:any) => (
        <div key={field.name} className={styles.Form_field}>
          <label className={styles.Form_field_label}>{field.label}</label>
          <input className={styles.Form_field_input} type={field.type} {...register(field.name,{required:true})} />
          {errors[field.name] && <span className={styles.Form_field_error}>{field.label} is required</span>}
        </div>
      ))}
      <CustomButton name={buttonName} type='submit'/>
    </form>
  )
}

export default FormHandler