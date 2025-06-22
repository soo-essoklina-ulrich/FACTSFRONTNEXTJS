'use client';
import { GalleryVerticalEnd, User2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { InputWithIcon, PasswordInput } from '@/components/ui/input';
import { z } from 'zod';
import { schemaLogin } from '@/service/auth/auth-service';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signIn } from 'next-auth/react';
import { Progress } from '@/components/ui/progress';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

type formData = z.infer<typeof schemaLogin>;

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<formData>({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const SubmitForm = async (data: formData) => {
    setIsSubmitting(true);

    const res = await signIn('credentials', { ...data, redirect: false });

    if (res && res.ok && res.error === null) {
      const redirectURL = searchParams.get('redirectTo') ?? '/';

      router.replace(redirectURL);
      // router.push('/home')
    } else {
      console.log('error', res?.error);
      toast.error('Identifiant Invalide');
    }
    setTimeout(() => {
      setIsSubmitting(false);
    }, 5000);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(SubmitForm)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a href="#" className="flex flex-col items-center gap-2 font-medium">
                <div className="flex size-8 items-center justify-center rounded-md">
                  <Avatar>
                    <AvatarImage src={'/identity_redim.ico'}></AvatarImage>
                    <AvatarFallback>SS</AvatarFallback>
                  </Avatar>
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <span className="sr-only">SOOSMART GRP.</span>
              </a>
              <h1 className="text-xl font-bold">Bienvenue sur SOOSMART FACTS</h1>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <InputWithIcon
                          icon={User2Icon}
                          iconPosition={'left'}
                          placeholder="John1234"
                          {...field}
                          required
                        />
                      </FormControl>

                      <FormMessage className={'text-red-600'} />
                    </FormItem>
                  )}
                />
                {/*</div>*/}
                {/*    <div className="grid gap-3">*/}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} />
                      </FormControl>

                      <FormMessage className={'text-red-600'} />
                    </FormItem>
                  )}
                />
              </div>
              {isSubmitting ? (
                <Progress color={'green'} />
              ) : (
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  Connexion
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
