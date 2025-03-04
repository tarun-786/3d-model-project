import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ModelUploadForm = () => {
  const [modelUrl, setModelUrl] = useState('');
  const [modelName, setModelName] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic URL validation
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    
    if (!urlPattern.test(modelUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    if (!modelName) {
      setError('Please provide a model name');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const response = await axios.post(`${backendUrl}/upload`, {
          name: modelName,
          description: description,
          url: modelUrl,
      });

      // Redirect to home page after successful upload
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Upload failed. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-3xl font-extrabold text-center mb-8">Upload 3D Model</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="modelName" className="block text-sm font-medium text-gray-700">
                      Model Name
                    </label>
                    <input
                      type="text"
                      id="modelName"
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                      required
                      placeholder="Enter model name"
                    />
                  </div>

                  <div>
                    <label htmlFor="modelUrl" className="block text-sm font-medium text-gray-700">
                      Model URL (GLB/GLTF)
                    </label>
                    <input
                      type="url"
                      id="modelUrl"
                      value={modelUrl}
                      onChange={(e) => setModelUrl(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                      required
                      placeholder="https://example.com/model.glb"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description (Optional)
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                      rows="3"
                      placeholder="Enter model description"
                    />
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm text-center">
                      {error}
                    </div>
                  )}

                  <div className="pt-4 flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => navigate('/')}
                      className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none border border-gray-300 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
                    >
                      {uploading ? 'Uploading...' : 'Upload Model'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelUploadForm;