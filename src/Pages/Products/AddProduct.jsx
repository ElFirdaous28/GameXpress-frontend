import { useState } from "react";
import {
    Package,
    Save,
    X,
    Upload,
    Image as ImageIcon,
    Star
} from "lucide-react";
import Layout from "../Layout";
import api from "../../Services/api";

export default function AddProduct() {
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        price: "",
        stock: "",
        subcategory_id: "",
        primary_image: null,
        images: []
    });

    // Example subcategories for the dropdown
    const subcategories = [
        { id: 1, name: "Smartphones" },
        { id: 2, name: "Laptops" },
        { id: 3, name: "Headphones" },
        { id: 4, name: "Monitors" },
        { id: 5, name: "Gaming Accessories" },
        { id: 6, name: "Cameras" },
        { id: 7, name: "Smart Home" }
    ];

    // Mock image uploads
    const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
    const [primaryImagePreview, setPrimaryImagePreview] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Auto-generate slug from name
        if (name === "name") {
            setFormData({
                ...formData,
                name: value,
                slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
            });
        }
    };

    const handlePrimaryImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData({
                ...formData,
                primary_image: file
            });

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPrimaryImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImagesUpload = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);

            // Update form data
            setFormData({
                ...formData,
                images: [...formData.images, ...filesArray]
            });

            // Create previews
            const newPreviewUrls = [];
            filesArray.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newPreviewUrls.push(reader.result);
                    if (newPreviewUrls.length === filesArray.length) {
                        setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index) => {
        const updatedImages = [...formData.images];
        updatedImages.splice(index, 1);

        const updatedPreviews = [...imagePreviewUrls];
        updatedPreviews.splice(index, 1);

        setFormData({
            ...formData,
            images: updatedImages
        });
        setImagePreviewUrls(updatedPreviews);
    };

    const removePrimaryImage = () => {
        setFormData({
            ...formData,
            primary_image: null
        });
        setPrimaryImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const payload = new FormData();
        payload.append("name", formData.name);
        payload.append("slug", formData.slug);
        payload.append("price", formData.price);
        payload.append("stock", formData.stock);
        payload.append("subcategory_id", formData.subcategory_id);
    
        if (formData.primary_image) {
            payload.append("primary_image", formData.primary_image);
        }
    
        formData.images.forEach((image, index) => {
            payload.append("images[]", image);
        });
    
        try {
            const response = await api.post("/v1/admin/products", payload, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    
            console.log("Product added:", response.data);
        } catch (error) {
            console.error("Add product error:", error.response?.data || error.message);
        }
    };
    return (
        <Layout title="Add Product">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <div className="bg-blue-500 bg-opacity-20 p-3 rounded-full mr-3">
                        <Package size={24} className="text-blue-500" />
                    </div>
                    <h1 className="text-2xl font-bold">Add New Product</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="name">
                            Product Name*
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    {/* Product Slug */}
                    <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="slug">
                            Product Slug*
                        </label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            value={formData.slug}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="product-slug"
                            required
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            URL-friendly version of the product name (auto-generated)
                        </p>
                    </div>

                    {/* Product Price */}
                    <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="price">
                            Price*
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                $
                            </span>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                step="0.01"
                                min="0"
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                                required
                            />
                        </div>
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="stock">
                            Stock*
                        </label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            min="0"
                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                            required
                        />
                    </div>

                    {/* Subcategory */}
                    <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="subcategory_id">
                            Subcategory*
                        </label>
                        <select
                            id="subcategory_id"
                            name="subcategory_id"
                            value={formData.subcategory_id}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select a subcategory</option>
                            {subcategories.map(subcategory => (
                                <option key={subcategory.id} value={subcategory.id}>
                                    {subcategory.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Primary Image Upload */}
                <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">
                        Primary Image*
                    </label>
                    <div className="flex items-center">
                        <div className="flex-1">
                            <div className="border-2 border-dashed border-gray-600 rounded-md p-6 flex justify-center items-center bg-gray-700">
                                {primaryImagePreview ? (
                                    <div className="relative w-48 h-48">
                                        <img
                                            src={primaryImagePreview}
                                            alt="Primary product"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={removePrimaryImage}
                                            className="absolute top-2 right-2 bg-red-600 rounded-full p-1 hover:bg-red-700"
                                        >
                                            <X size={16} />
                                        </button>
                                        <div className="absolute top-2 left-2 bg-yellow-500 rounded-full p-1">
                                            <Star size={16} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <ImageIcon size={48} className="mx-auto text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-400">Upload primary product image</p>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                                        <input
                                            type="file"
                                            id="primary_image"
                                            name="primary_image"
                                            accept="image/*"
                                            onChange={handlePrimaryImageUpload}
                                            className="hidden"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById('primary_image').click()}
                                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm flex items-center mx-auto"
                                        >
                                            <Upload size={16} className="mr-2" />
                                            Select File
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Images Upload */}
                <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">
                        Additional Images
                    </label>
                    <div className="border-2 border-dashed border-gray-600 rounded-md p-6 bg-gray-700">
                        {imagePreviewUrls.length > 0 ? (
                            <div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                                    {imagePreviewUrls.map((url, index) => (
                                        <div key={index} className="relative h-24 w-full">
                                            <img
                                                src={url}
                                                alt={`Product ${index + 1}`}
                                                className="h-full w-full object-cover rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-red-600 rounded-full p-1 hover:bg-red-700"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center">
                                    <input
                                        type="file"
                                        id="additional_images"
                                        name="additional_images"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImagesUpload}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('additional_images').click()}
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm flex items-center"
                                    >
                                        <Upload size={16} className="mr-2" />
                                        Add More Images
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <ImageIcon size={48} className="mx-auto text-gray-400" />
                                <p className="mt-2 text-sm text-gray-400">Upload additional product images</p>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                                <input
                                    type="file"
                                    id="additional_images"
                                    name="additional_images"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImagesUpload}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('additional_images').click()}
                                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm flex items-center mx-auto"
                                >
                                    <Upload size={16} className="mr-2" />
                                    Select Files
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-end">
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md text-sm flex items-center"
                    >
                        <Save size={16} className="mr-2" />
                        Save Product
                    </button>
                </div>
            </form>
        </Layout>
    );
}
