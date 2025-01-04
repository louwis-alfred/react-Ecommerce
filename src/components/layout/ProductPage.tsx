import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../ui/button";

const ProductPage = () => {
  interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    images: string[]; // Corrected to match the API response
  }

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.log(`Error fetching product: ${error}`);
        });
    }
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-5 w-[60%]">
      {/* Back Button */}
      <Button onClick={() => navigate(-1)} className="mb-5 px-4 py-2">
        Back
      </Button>

      {/* Product Details */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full md:w-1/2">
          <div className="grid grid-cols-1 gap-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-semibold">${product.price}</span>
            <span className="ml-4 text-yellow-500">
              {product.rating} ★
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;