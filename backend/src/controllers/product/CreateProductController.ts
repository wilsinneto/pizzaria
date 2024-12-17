import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

import { CreateProductService } from "../../services/product/CreateProductService";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;
    const { files } = req;

    const createProductService = new CreateProductService();

    if (!files || !Object.keys(files).length) {
      throw new Error("error upload file");
    }

    const file = files["file"] as UploadedFile;

    const fileResponse: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, function (error, result) {
            if (error) {
              reject(error);
              return;
            }

            resolve(result);
          })
          .end(file.data);
      }
    );

    const product = await createProductService.execute({
      category_id,
      name,
      price,
      description,
      banner: fileResponse.url,
    });

    res.json(product);
  }
}

export { CreateProductController };
