const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50 mx-auto mb-4"></div>
                <p className="text-gray-700 text-lg">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;
