'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import SkeletonCard from './skeleton';

interface AlertProp {
    pageLink: string
}


export default function AlertSession({ pageLink }: AlertProp) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Ви не увійшли в акаунт?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Щоб переглянути повну новину, увійдіть в акаунт або зареєструйтесь.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Link href={pageLink} className="w-full block">
                            <AlertDialogCancel className="w-full">Відмінити</AlertDialogCancel>
                        </Link>
                        <Link href="/login" className="w-full block">
                            <AlertDialogAction className="w-full">Увійти</AlertDialogAction>
                        </Link>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <SkeletonCard />
        </>
    );
}