import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { isServer, productsSchema } from "@/lib/validators/productSchema";
import { desc } from "drizzle-orm";
import { writeFile } from "node:fs/promises";
import path from "node:path";

export async function  POST(request:Request) {

    //todo:check user access (like only admin can add product not customer)

    const data = await request.formData();
    let validatedData;
    try{
        validatedData=  productsSchema.parse({
            name:data.get('name'),
            description:data.get('description'),
            price:Number(data.get('price')),
            image:data.get('image')
        })
    }catch(err){
        return Response.json({message:err},{status:400});
    }

    const inputImage = isServer
    ? (validatedData.image as File)
    : (validatedData.image as FileList)[0];
    const filename=`${Date.now()}.${inputImage.name.split(".").slice(-1)}`;  //original name: choco.png 
    // 212313434.png we want

    try {
        const buffer=Buffer.from(await inputImage.arrayBuffer());
        await writeFile(path.join(process.cwd(),"public/assets",filename),buffer);
    } catch (error) {
        return Response.json({message:"Failed to save the file to fs"},{status:500})
    }

    try {
        await db.insert(products).values({...validatedData ,image:filename })
    } catch (error) {
        //todo:remove stored iamge from fs
        return Response.json({message:"Failed to store product into database"},{status:500})
    }

    return Response.json({message:"OK"},{status:201});
}

export async function GET(){

   try {
    const allProducts=await db.select().from(products).orderBy(desc(products.id));
    return Response.json(allProducts);
    
   } catch (error) {
    return Response.json({message:"Failed to fetch products"},{status:500});
   }

}