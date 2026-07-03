'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';

const productSchema = z.object({
  title: z.string().min(5, 'title must be greater than 5 characters'),
  description: z.string().min(25, 'description is too small'),
  category: z.string().min(5, 'category must be greater than 5 characters'),
  image:
    typeof window === 'undefined'
      ? z.any()
      : z
          .instanceof(FileList)
          .refine((files) => files?.length > 0, 'Image is required'),
  price: z.string().min(1),
});

type ProductType = z.infer<typeof productSchema>;

export default function CreateProduct() {
  const [imageUrl, setImageUrl] = useState('');
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });

  function onSubmit(data: ProductType) {
    const fileList = data.image as FileList;
    const file = fileList?.[0];

    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);

    const formdata = new FormData();
    formdata.append('file', file);

    console.log(`uploaded file: ${file.name}`);
    console.log(data);

    // Cleanup URL object
    return () => URL.revokeObjectURL(objectUrl);
  }

  return (
    <Card className='max-w-md m-auto'>
      <CardHeader className='w-full'>
        <CardTitle>
          <h1 className='text-center fancy'>Create a Product</h1>
        </CardTitle>
        <CardDescription>
          <p className='text-center'>
            Make a product that will be stored in database for easy access and
            retrieval
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className='w-full'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col space-y-4 items-center w-full'
        >
          <div className='w-full'>
            <Controller
              name='image'
              control={control}
              render={({ field: { onChange, onBlur, name, ref } }) => (
                <input
                  type='file'
                  name={name}
                  ref={ref}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e.target.files)}
                  accept='image/*'
                />
              )}
            />
            {errors.image && (
              <p className='text-red-500 italic'>
                {errors.image.message as string}
              </p>
            )}
            {imageUrl && (
              <Image
                src={imageUrl}
                alt='preview'
                className='mt-2 max-h-48'
              />
            )}
          </div>
          {/* Other fields remain the same */}
          <div className='w-full'>
            <input
              placeholder='What is the Title of the product ?'
              {...register('title')}
            />
            {errors.title && (
              <p className='text-red-500 italic'>{errors.title.message}</p>
            )}
          </div>
          <div className='w-full'>
            <textarea
              placeholder='Describe the product'
              {...register('description')}
            />
            {errors.description && (
              <p className='text-red-500 italic'>
                {errors.description.message}
              </p>
            )}
          </div>
          <div className='w-full'>
            <input
              placeholder='What is the category ?'
              {...register('category')}
            />
            {errors.category && (
              <p className='text-red-500 italic'>{errors.category.message}</p>
            )}
          </div>
          <div className='w-full'>
            <input
              type='number'
              placeholder='What is the price'
              {...register('price')}
            />
            {errors.price && (
              <p className='text-red-500 italic'>{errors.price.message}</p>
            )}
          </div>
          <Button
            className='w-full cursor-pointer'
            type='submit'
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
