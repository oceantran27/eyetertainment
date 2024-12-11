import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fileName, fileData } = req.body;

    if (!fileName || !fileData) {
      return res.status(400).json({ error: 'Missing file data or file name' });
    }

    // Đường dẫn đến thư mục lưu tệp
    const directory = path.join(process.cwd(), 'public', 'temp-accounts', '5');

    // Tạo thư mục nếu chưa tồn tại
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Lưu tệp vào thư mục
    const filePath = path.join(directory, fileName);
    const base64Data = fileData.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(filePath, base64Data, 'base64');

    return res.status(200).json({ message: 'File uploaded successfully', filePath });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}