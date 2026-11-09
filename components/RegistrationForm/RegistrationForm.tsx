'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'sonner';

import { api } from '@/lib/api/api';
import { useAuthStore } from '@/lib/store/authStore';

import styles from './RegistrationForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .max(32, 'Максимум 32 символи')
    .required("Введіть ім’я"),

  email: Yup.string()
    .trim()
    .email('Введіть коректний email')
    .max(64, 'Максимум 64 символи')
    .required('Введіть email'),

  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .max(128, 'Максимум 128 символів')
    .required('Введіть пароль'),
});

type RegisterResponse = {
  message?: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export default function RegistrationForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,

    onSubmit: async (values) => {
      try {
        const response = await api.post<RegisterResponse>(
          '/auth/register',
          {
            name: values.name.trim(),
            email: values.email.trim().toLowerCase(),
            password: values.password,
          }
        );

        setUser(response.data.user);

        toast.success('Реєстрація успішна!');

        router.push('/');
      } catch (error: unknown) {
        let message = 'Не вдалося зареєструватися. Спробуйте ще раз.';

        if (axios.isAxiosError(error)) {
          message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            message;
        } else if (error instanceof Error) {
          message = error.message;
        }

        toast.error(message);
      }
    },
  });

  return (
    <div className={styles.formWrapper}>
      <nav className={styles.tabs}>
        <Link
          href="/auth/register"
          className={`${styles.tab} ${styles.activeTab}`}
        >
          Реєстрація
        </Link>

        <Link href="/auth/login" className={styles.tab}>
          Вхід
        </Link>
      </nav>

      <h1 className={styles.title}>Реєстрація</h1>

      <form
        className={styles.form}
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <div className={styles.fieldGroup}>
          <label htmlFor="name">Ім’я*</label>

          <input
            id="name"
            type="text"
            placeholder="Ваше ім’я"
            autoComplete="name"
            disabled={formik.isSubmitting}
            className={styles.input}
            {...formik.getFieldProps('name')}
          />

          {formik.touched.name && formik.errors.name && (
            <span className={styles.error}>
              {formik.errors.name}
            </span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="email">Email*</label>

          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            autoComplete="email"
            disabled={formik.isSubmitting}
            className={styles.input}
            {...formik.getFieldProps('email')}
          />

          {formik.touched.email && formik.errors.email && (
            <span className={styles.error}>
              {formik.errors.email}
            </span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="password">Пароль*</label>

          <div className={styles.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              autoComplete="new-password"
              disabled={formik.isSubmitting}
              className={styles.input}
              {...formik.getFieldProps('password')}
            />

            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? 'Сховати пароль' : 'Показати пароль'
              }
              disabled={formik.isSubmitting}
            >
              {showPassword ? 'Сховати' : 'Показати'}
            </button>
          </div>

          {formik.touched.password && formik.errors.password && (
            <span className={styles.error}>
              {formik.errors.password}
            </span>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <span className={styles.loaderWrapper}>
              <span className={styles.loader}></span>
              Реєстрація...
            </span>
          ) : (
            'Зареєструватися'
          )}
        </button>
      </form>
    </div>
  );
}
