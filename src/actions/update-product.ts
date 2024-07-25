"use server"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Response = {
    string: string;
}

export async function updateProductFeatured(productId: string, featured: boolean): Promise<any> {
    try {
        await prisma.product.update({
            where: { id: productId },
            data: { featured: featured },
        });

        console.log('Product featured field updated successfully');
        return {success: true, message: 'Product featured field updated successfully'}
    } catch (error) {
        console.error('Error updating product featured field:', error);
        return {success: false, message: error}
    }
}

