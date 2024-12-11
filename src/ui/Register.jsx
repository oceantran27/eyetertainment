import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setImage(URL.createObjectURL(file));  // display image
        }
    };

  const handleUpload = async () => {
    if (image) {
      // Lấy dữ liệu Base64 từ ảnh
      const response = await fetch(image);
      const blob = await response.blob();
      const fileReader = new FileReader();
  
      fileReader.onloadend = async () => {
        const base64String = fileReader.result;
  
        // Gửi ảnh đến API
        const fileName = `avatar.jpg`; // Tên file có thể tùy chỉnh
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileName,
            fileData: base64String,
          }),
        });
  
        if (res.ok) {
          alert('File uploaded successfully');
          router.push('/login');
        } else {
          alert('Failed to upload file');
        }
      };
  
      fileReader.readAsDataURL(blob);
    } else {
      alert('Please select an image to upload');
    }
    
    if (image) {
      // Upload image to server
        router.push('/login');  // redirect to login page
    } else {
      alert('Please select an image to upload');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#1e1f25] p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-2 text-[#e2e2e9]">Register</h1>
        <p className="text-md text-center mb-6 text-[#adc6ff]">Please choose an image that fully shows your face</p>

        {/* Text input */}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full px-4 py-2 mb-4 text-md text-[#112f60] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b4678] placeholder-[#2b4678]"
        />
        {/* File input */}
        <label
          htmlFor="file-input"
          className="block w-full text-md text-[#112f60] bg-[#adc6ff] rounded-lg cursor-pointer mb-4 py-2 text-center hover:bg-[#2b4678] hover:text-[#d8e2ff] transition"
        >
          Choose File
        </label>
        <input
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden" 
        />

        {/* Display image */}
        {image && (
          <div className="mb-4">
            <img src={image} alt="Picked image" className="w-full h-auto rounded-lg shadow-sm" />
          </div>
        )}

        <button
          onClick={handleUpload}
          className={`w-full py-2 rounded-lg text-[#112f60] bg-[#adc6ff] hover:bg-[#2b4678] hover:text-[#d8e2ff] transition ${!image ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={!image}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
