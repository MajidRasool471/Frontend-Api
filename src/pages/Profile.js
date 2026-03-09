import { useState, } from "react";
import Navbar from "../components/Navbar";
function Profile() {
    const [image, setImage] = useState(null);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
        setImage(URL.createObjectURL(file));
        }
    };
    return (
        <>
        <Navbar />
        <div className="flex justify-center items-center mt-10 px-4">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Profile</h2>
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                {image ? (
                    <img src={image} alt="profile"
                    className="w-full h-full object-cover" />
                ): (
                    <span className="text-center mt-12 text-gray-600"></span>
                )}
            </div>
                <div className="flex flex-col md:flex-row gap-3 mt-5 w-full">
                <label className="bg-blue-500 text-white text-center px-4 py-2 rounded cursor-pointer w-full md:w-auto">
                    Take a Picture
              <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImage}
              className="hidden" />
              </label>
                        <label className="bg-green-500 text-white text-center px-4 py-2 rounded cursor-pointer w-full md:w-auto">
                    Choose from Gallery
              <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImage}
              className="hidden" />
              </label>
              </div>
        </div>
        </div>
        </>
    );
}
  export default Profile;