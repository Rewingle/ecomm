"use server"
import { PrismaClient } from '@prisma/client';
import { actionResponseType } from '@/app/types';
import actionResponse from '@/lib/Responses/actionResponse';

const prisma = new PrismaClient();

export async function updateProductFeatured(productId: string, featured: boolean): Promise<actionResponseType> {
    try {
        await prisma.product.update({
            where: { id: productId },
            data: { featured: featured },
        });

        return actionResponse({ success: true, message: 'Product featured field updated successfully', data: null });
    } catch (error) {
        return actionResponse({ success: false, message: error as any as string, data: null });
    }
}

