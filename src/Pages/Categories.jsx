import React, { useEffect, useState } from 'react';
import { useCategory } from '../Context/CategoryContext';
import { Box, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import Layout from './Layout';

function Categories() {
    const { categories, loading, setCategories, deleteCategory, addCategory, updateCategory,fetchCategories } = useCategory();
    const [editingCategory, setEditingCategory] = useState(null);
    const [newCategory, setNewCategory] = useState({
        id: '',
        name: '',
    });
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // fetchCategories();
    }, []);

    const handleEdit = (category) => {
        setEditingCategory({ ...category });
    };

    const handleChangeEditingCategory = (e) => {
        setEditingCategory({ ...editingCategory, [e.target.name]: e.target.value });
    };

    const handleSaveEdit = async () => {
        if (!editingCategory.name.trim()) return;

        try {
            await updateCategory(editingCategory.id, {
                name: editingCategory.name,
                slug: editingCategory.name
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
            });
            setEditingCategory(null);
            fetchCategories(); // Re-fetch categories after update
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
        }
    };


    const handleCancelEdit = () => {
        setEditingCategory(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
            setCategories(categories.filter(category => category.id !== id));
            deleteCategory(id);
        }
    };

    const handleChangeNewCategory = (e) => {
        setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
    };

    const handleAddCategory = async () => {
        if (newCategory.name.trim() === '') return;

        const slug = newCategory.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '');

        const categoryToSend = {
            name: newCategory.name,
            slug: slug,
        };

        await addCategory(categoryToSend);
        setNewCategory({ id: '', name: '' });
        setShowAddForm(false);
        fetchCategories(); 
    };


    const filteredCategories = categories.filter(category =>
        category?.id?.toString().includes(searchTerm.toLowerCase()) ||
        category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Layout>
        {/* <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}> */}
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                        <CircularProgress />
                    </Box>
                ) : (
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-bold">Gestion des Catégories</h1>
                    </div>
                )}
                <div className="p-6 bg-gray-800 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-6 text-white">Liste des Catégories</h2>

                    {/* Barre d'outils */}
                    <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="pl-10 p-2 border border-gray-300 rounded-md w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <button
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                            onClick={() => setShowAddForm(true)}
                        >
                            <PersonAddIcon className="h-5 w-5" />
                            Ajouter une catégorie
                        </button>
                    </div>

                    {/* Formulaire d'ajout */}
                    {showAddForm && (
                        <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-800">
                            <h3 className="text-lg font-medium mb-4">Ajouter une nouvelle catégorie</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-white mb-1">Nom</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        value={newCategory.name}
                                        onChange={handleChangeNewCategory}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                                    onClick={() => setShowAddForm(false)}
                                >
                                    Annuler
                                </button>
                                <button
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                                    onClick={handleAddCategory}
                                >
                                    Ajouter
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Tableau des catégories */}
                    <div className="overflow-x-auto bg-gray-800">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="py-3 px-4 text-left text-white font-medium">ID</th>
                                    <th className="py-3 px-4 text-left text-white font-medium">Nom</th>
                                    <th className="py-3 px-4 text-left text-white font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-gray-800">
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map(category => (
                                        <tr key={category.id}>
                                            {editingCategory && editingCategory.id === category.id ? (
                                                <>
                                                    <td className="py-3 px-4 text-gray-500">{category.id}</td>
                                                    <td className="py-3 px-4">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            className="w-full p-1 border border-gray-300 rounded"
                                                            value={editingCategory.name}
                                                            onChange={handleChangeEditingCategory}
                                                        />
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex space-x-2">
                                                            <button onClick={handleSaveEdit} className="text-green-500 hover:text-green-600">
                                                                <CheckIcon />
                                                            </button>
                                                            <button onClick={handleCancelEdit} className="text-red-500 hover:text-red-600">
                                                                <CloseIcon />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="py-3 px-4">{category.id}</td>
                                                    <td className="py-3 px-4">{category.name}</td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex space-x-2">
                                                            <button onClick={() => handleEdit(category)} className="text-blue-500 hover:text-blue-600">
                                                                <EditIcon />
                                                            </button>
                                                            <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-600">
                                                                <DeleteIcon />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="py-3 px-4 text-center text-gray-500">
                                            Aucune catégorie trouvée
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            {/* </Box> */}
        </Layout>
    );
}

export default Categories;
