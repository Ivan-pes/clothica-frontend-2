'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { api } from '@/lib/api/api';
import { useAuthStore } from '@/lib/store/authStore';
import styles from './RegistrationForm.module.css';

type User = {
  id: string;
  name: string;
  phone: string;
};

type RegisterResponse = {
  message: string;
  user: User;
};

const formatPhone = (value: string) => {
  let digits = value.replace(/\D/g, '');

  if (digits.startsWith('38')) {
    digits = digits.slice(2);
  }

  digits = digits.slice(0, 10);

  if (!digits) return '';

  let result = `+38 (${digits.slice(0, 3)}`;

  if (digits.length >= 3) {
    result += ')';
  }

  if (digits.length > 3) {
    result += ` ${digits.slice(3, 6)}`;
  }

  if (digits.length > 6) {
    result += `-${digits.slice(6, 8)}`;
  }

  if (digits.length > 8) {
    result += `-${digits.slice(8, 10)}`;
  }

  return result;
};

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .matches(
      /^[\p{Script=Latin}\p{Script=Cyrillic}0-9]+$/u,
      'Використовуйте лише літери та цифри'
    )
    .min(3, 'Мінімум 3 символи')
    .max(32, 'Максимум 32 символи')
    .required("Введіть ім'я"),

  phone: Yup.string()
    .matches(/^\+38\d{10}$/, 'Введіть номер у форматі +380XXXXXXXXX')
    .required('Введіть номер телефону'),

  password: Yup.string()
    .matches(/^[A-Za-z0-9]+$/, 'Лише латинські літери та цифри')
    .min(8, 'Мінімум 8 символів')
    .max(128, 'Максимум 128 символів')
    .required('Введіть пароль'),
});

export default function RegistrationForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { data } = await api.post<RegisterResponse>(
          '/auth/register',
          {
            name: values.name.trim(),
            phone: values.phone,
            password: values.password,
          }
        );

        setUser(data.user);

        toast.success('Реєстрація успішна!');
        router.push('/');
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : 'Не вдалося зареєструватися';

        toast.error(message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.formWrapper}>
      <div className={styles.tabs}>
        <div className={`${styles.tab} ${styles.activeTab}`}>
          Реєстрація
        </div>

        <Link href="/auth/login" className={styles.tab}>
          Вхід
        </Link>
      </div>

      <h1 className={styles.title}>Реєстрація</h1>

      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label htmlFor="name">Ім’я*</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Ваше ім’я"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.input}
          />
          {formik.touched.name && formik.errors.name && (
            <span className={styles.error}>
              {formik.errors.name}
            </span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="phone">Номер телефону*</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+38 (0__) ___-__-__"
            value={formatPhone(formik.values.phone)}
            onChange={(event) => {
              const digits = event.target.value.replace(/\D/g, '');
              const localDigits = digits.startsWith('38')
                ? digits.slice(2)
                : digits;

              formik.setFieldValue(
                'phone',
                localDigits ? `+38${localDigits.slice(0, 10)}` : ''
              );
            }}
            onBlur={formik.handleBlur}
            className={styles.input}
          />
          {formik.touched.phone && formik.errors.phone && (
            <span className={styles.error}>
              {formik.errors.phone}
            </span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="password">Пароль*</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.input}
          />
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
          {formik.isSubmitting
            ? 'Зачекайте...'
            : 'Зареєструватися'}
        </button>
      </form>
    </div>
  );
}