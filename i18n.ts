import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'es'];

export default getRequestConfig(async ({ locale }: any) => {
  if (!locale || !locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`./src/messages/${locale}.json`)).default
  };
});
